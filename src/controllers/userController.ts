import { mongooseConnect } from "@/lib/config/mongoConfig";
import { requireAuth } from "@/lib/utils/auth";
import { NextRequest, NextResponse } from "next/server";

export const getUserDetails = async (req: NextRequest) => {
  try {
    await mongooseConnect();
    const user = await requireAuth(req);
    if (user) {
      return NextResponse.json(
        {
          status: "success",
          message: "User details fetched successfully",
          customer: user,
        },
        { status: 200 }
      );
    } else
      return NextResponse.json(
        { status: "error", message: "Error fetching user details" },
        { status: 500 }
      );
  } catch (error: any) {
    console.log(error?.message);
    return NextResponse.json(
      { status: "error", message: "Internal Server error" },
      { status: 500 }
    );
  }
};
