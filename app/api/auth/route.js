import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request) {
  const token = jwt.sign(
    {
      user: {
        name: "Irfan",
      },
    },
    process.env.JWT_SECRET,
    { algorithm: "HS256" }
  );

  return NextResponse.json({ token }, { status: 200 });
}
