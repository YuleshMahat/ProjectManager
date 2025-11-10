// src/app/api/auth/register/route.js
import { NextResponse, userAgent } from "next/server";
import { createOne, findByFilter } from "@/models/auth/authModel";
import { mongooseConnect } from "@/lib/config/mongoConfig";
import { parseJSON } from "@/lib/utils/parseJson";
import { encodeFunction, decodeFunction } from "@/lib/utils/passwordEncrypt";
import { createAccessToken, createRefreshToken } from "@/lib/utils/jwt";

export async function registerUser(req) {
  try {
    await mongooseConnect();
    const data = await parseJSON(req);
    const { password, ...rest } = data;

    let encryptedPassword = encodeFunction(password);

    const user = await createOne({ ...rest, password: encryptedPassword });
    return NextResponse.json({
      status: "success",
      user,
      message: "registration successful",
    });
  } catch (err) {
    return NextResponse.json(
      { status: "error", message: "Cannot register user" },
      { status: 500 }
    );
  }
}

export async function loginUser(req) {
  try {
    await mongooseConnect();
    const { email, password } = await parseJSON(req);
    const result = await findByFilter({ email });

    console.log(email, password);
    if (!result) {
      return NextResponse.json(
        { status: "error", message: "Invalid credentials" },
        { status: 400 }
      );
    }
    const isPasswordValid = decodeFunction(password, result.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { status: "error", message: "Invalid credentials" },
        { status: 400 }
      );
    }

    const user = result.toObject();
    console.log(user);
    const payload = {
      fname: user.fname,
      lname: user.lname,
      email: user.email,
    };

    const accessToken = createAccessToken(payload);
    const refreshToken = createRefreshToken(payload);
    return NextResponse.json(
      {
        status: "success",
        message: "Login Successful",
        user,
        accessToken,
        refreshToken,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
