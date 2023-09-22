import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { compare, compareSync } from "bcrypt";

export async function POST(request) {
  const { username, password } = await request.json();
  if (!username || !password)
    return NextResponse.json(
      { error: "incorrect username or password." },
      { status: 401 }
    );

  // Check username and password valid in database
  const account = {
    name: "Muhammad Irfan",
    username,
    hashedPassword:
      "$2b$10$y9Xo1FbiwRjqKI.2kAE2EOi39.6IKl9gPNRHUstLyT3YreEjteNQS",
  };

  //   Check password
  const passCorrect = compareSync(password, account.hashedPassword);
  console.log(passCorrect);
  if (!passCorrect)
    return NextResponse.json(
      {
        error: "Password is not correct.",
      },
      { status: 401 }
    );

  const authtoken = jwt.sign(
    {
      username,
      name: account.name,
    },
    process.env.JWT_SECRET,
    { algorithm: "HS256" }
  );

  return NextResponse.json(
    {
      success: "Welcome back " + account.name,
      authtoken,
    },
    { status: 200 }
  );
}
