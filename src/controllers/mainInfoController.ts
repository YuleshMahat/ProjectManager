import { mongooseConnect } from "@/lib/config/mongoConfig";
import { requireAuth } from "@/lib/utils/auth";
import { parseJSON } from "@/lib/utils/parseJson";
import {
  createNew,
  findByFilter,
  updateById,
} from "@/models/mainInfo/mainInfoModel";
import { NextResponse } from "next/server";

export const updateInfo = async (req: Request) => {
  const { user, message, status } = await requireAuth(req);
  if (message)
    return NextResponse.json({ status: "error", message }, { status });
  console.log("user", user);
  const data = await parseJSON(req);
  const { infoId, ...updateObj } = data;

  try {
    let result = {};
    if (infoId === "" || !infoId) {
      result = await createNew(updateObj);
    } else {
      result = await updateById(infoId, updateObj);
      console.log(5512255, result);
    }
    if (result)
      return NextResponse.json(
        { status: "success", message: "Successfully updated details", result },
        { status: 200 }
      );
  } catch (err) {
    console.log(err.message);
    return NextResponse.json(
      { status: "error", message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const getMainInfo = async (req: Request) => {
  try {
    await mongooseConnect();
    const { user, message, status } = await requireAuth(req);
    if (message)
      return NextResponse.json({ status: "error", message }, { status });

    const result = await findByFilter({ userId: user._id });

    return NextResponse.json(
      { status: "success", message: "Successfully fetched details", result },
      { status: 200 }
    );
  } catch (err) {
    console.log(err.message);
    return NextResponse.json(
      { status: "error", message: "Internal server error" },
      { status: 500 }
    );
  }
};
