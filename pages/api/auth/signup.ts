// Next
import { NextApiRequest, NextApiResponse } from "next";
// Prisma
import { PrismaClient } from "@prisma/client";
// Bcrypt
import bcrypt from "bcrypt";
// Jose
import * as jose from "jose";
// Zod
import signUpFormSchema, { SignUpFormValues } from "@/schemas/signUp.schema";

export interface SignUpApiRequest extends NextApiRequest {
  body: SignUpFormValues;
}

const prisma = new PrismaClient();

export default async function handler(
  req: SignUpApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const validBody = signUpFormSchema.safeParse(req.body);
    if (!validBody.success) {
      return res.status(400).json({ message: "Invalid body" });
    }

    const { email, password } = req.body;

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

    res.status(200).json({ message: user });
  }
}
