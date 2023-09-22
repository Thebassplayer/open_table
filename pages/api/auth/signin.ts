// Schemas
import signInFormSchema, { SignInFormValues } from "@/schemas/signin.schema";
// types
import { NextApiRequest, NextApiResponse } from "next";
// Prisma
import { PrismaClient } from "@prisma/client";
// bcrypt
import bcrypt from "bcrypt";
// jose
import * as jose from "jose";
// cookies-next
import { setCookie } from "cookies-next";

export interface SignInApiRequest extends NextApiRequest {
  body: SignInFormValues;
}

const prisma = new PrismaClient();

export default async function handler(
  req: SignInApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const validBody = signInFormSchema.safeParse(req.body);
    if (!validBody.success) {
      return res.status(400).json(validBody.error.message);
    }

    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(401).json({ message: "Email or password is invalid" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Email or password is invalid" });
    }

    const alg = "HS256";
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const token = await new jose.SignJWT({
      email: user.email,
    })
      .setProtectedHeader({ alg })
      .setExpirationTime("24h")
      .sign(secret);

    setCookie("jwt", token, {
      req,
      res,
      maxAge: 24 * 60,
    });

    return res.status(200).json({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone,
      city: user.city,
    });
  }

  return res.status(404).json({ message: "Not Found" });
}
