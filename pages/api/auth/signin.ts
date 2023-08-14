import signInFormSchema, { SignInFormValues } from "@/schemas/signIn.schema";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import * as jose from "jose";

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

    const userWithEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!userWithEmail) {
      return res.status(401).json({ message: "Email or password is invalid" });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      userWithEmail.password
    );
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Email or password is invalid" });
    }

    const alg = "HS256";
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const token = await new jose.SignJWT({
      email: userWithEmail.email,
    })
      .setProtectedHeader({ alg })
      .setExpirationTime("24h")
      .sign(secret);

    return res.status(200).json({ message: token });
  }

  return res.status(404).json({ message: "Not Found" });
}
