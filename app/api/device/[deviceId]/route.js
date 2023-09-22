import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request, { params }) {
  const { deviceId } = params;
  const auth = request.headers.get("authorization");

  const token = auth.split(" ");
  console.log(auth, token);

  if (token[0] !== "Bearer")
    return NextResponse.json({ error: "Bukan Bearer" }, { status: 401 });

  if (!auth)
    return NextResponse.json({ error: "Tidak ada token :/" }, { status: 401 });

  let encodedToken;
  try {
    encodedToken = jwt.verify(token[1], process.env.JWT_SECRET, {
      algorithms: "HS256",
    });
  } catch {
    return NextResponse.json({ error: "Token tidak valid" }, { status: 401 });
  }
  console.log(encodedToken);

  return NextResponse.json(
    {
      timestamp: new Date().getTime(),
      deviceId,
      authtoken: token[1],
      data: {
        r1: {
          name: "Relay1",
          on: true,
          active: true,
        },
        r2: {
          name: "Relay 2",
          on: false,
          active: true,
        },
        r3: {
          name: "Relay 3",
          on: false,
          active: false,
        },
        r4: {
          name: "Relay 3",
          on: false,
          active: false,
        },
      },
    },
    { status: 200 }
  );
}
