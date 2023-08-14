import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email } = req.body;

    const userWithEmail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (userWithEmail) {
      res.status(400).json({ message: "Email already exists!" });
      return;
    }

    res.status(200).json({ message: "Endpoint reached!" });
  }
}
