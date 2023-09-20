// Next
import { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "cookies-next";
// Prisma
import { PrismaClient } from "@prisma/client";
// Bcrypt
import bcrypt from "bcrypt";
// Jose
import * as jose from "jose";
// Zod
import signUpFormSchema, { SignUpFormValues } from "@/schemas/signUp.schema";
import { fromZodError } from "zod-validation-error";

export interface SignUpApiRequest extends NextApiRequest {
  body: SignUpFormValues;
}

const prisma = new PrismaClient();

export default async function handler(
  req: SignUpApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    // Validate data with Zod
    // const errors: string[] = [];
    // try {
    //   const inputs = req.body;
    //   signUpFormSchema.parse(inputs);
    // } catch (err: any) {
    //   const validationError = fromZodError(err);
    //   validationError.details.forEach(detail => {
    //     errors.push(detail.message);
    //   });
    //   return res.status(400).json({ message: errors });
    // }

    const userWithEmail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (userWithEmail) {
      res.status(400).json({ message: "Email already exists!" });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        ...req.body,
        password: hashedPassword,
      },
    });

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
}
