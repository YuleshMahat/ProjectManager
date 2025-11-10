import { parseJSON } from "@/lib/utils/parseJson";
import {
  findPersonalInfo,
  updatePersonalInfoModel,
} from "@/models/personalInfo/personalInfoModel";
import { NextRequest, NextResponse } from "next/server";

export const updatePersonalInfo = async (req: NextRequest) => {
  try {
    const data = await parseJSON(req);
    const { id, ...updateObj } = data;
    const result = await updatePersonalInfoModel(
      { userId: id },
      { userId: id, ...updateObj }
    );

    if (!result) {
      return NextResponse.json(
        { status: "error", message: "Failed to save personal info" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        status: "success",
        message: "Personal info saved successfully",
        data: result,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("PATCH /api/personal-info error:", err);
    return NextResponse.json(
      { status: "error", message: err.message || "Internal server error" },
      { status: 500 }
    );
  }
};

export const getPersonalInfo = async (id: string) => {
  try {
    const result = await findPersonalInfo({ userId: id });

    if (!result) {
      return NextResponse.json(
        { status: "error", message: "Personal info not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        status: "success",
        message: "Personal info fetched successfully",
        data: result,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("GET /api/personal-info error:", err);
    return NextResponse.json(
      { status: "error", message: err.message || "Internal server error" },
      { status: 500 }
    );
  }
};
