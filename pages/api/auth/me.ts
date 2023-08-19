import { NextApiRequest, NextApiResponse } from "next";
// jwt
import jwt from "jsonwebtoken";
// Prisma
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const bearerToken = req.headers.authorization as string;
  const token = bearerToken.split(" ")[1];

  const payload = jwt.decode(token) as { email: string };

  if (!payload || !payload.email) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
    select: {
      id: true,
      email: true,
      first_name: true,
      last_name: true,
      reviews: {
        select: {
          restaurant: true,
          text: true,
        },
      },
    },
  });

  return res.status(200).json({ user });
}
