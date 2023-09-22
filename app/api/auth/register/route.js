import { genSaltSync, hash, hashSync } from "bcrypt";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request) {
  const { username, password, name } = await request.json();

  if (!username || !password || !name)
    return NextResponse.json(
      { error: "please complete all fields." },
      { status: 400 }
    );

  const hashedPassword = hashSync(password, genSaltSync(10));
  console.log(hashedPassword);

  const account = { name, username, hashedPassword };
  // insert account to database

  const authtoken = jwt.sign(
    {
      username,
      name: account.name,
    },
    process.env.JWT_SECRET,
    { algorithm: "HS256" }
  );

  return NextResponse.json(
    { success: "You have been registered.", authtoken },
    { status: 200 }
  );
}
