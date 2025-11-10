import { mongooseConnect } from "@/lib/config/mongoConfig";
import { parseJSON } from "@/lib/utils/parseJson";
import {
  createNew,
  findByFilter,
  updateById,
} from "@/models/mainInfo/mainInfoModel";
import { NextResponse } from "next/server";

export const updateInfo = async (req: Request) => {
  const data = await parseJSON(req);
  console.log(data);
  const { infoId, ...updateObj } = data;

  try {
    let result = {};
    if (infoId === "" || !infoId) {
      result = await createNew(updateObj);
    } else {
      console.log(1212121212, updateObj);
      console.log("infoId", infoId);
      result = await updateById(infoId, updateObj);
      console.log(5512255, result);
    }

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

export const getMainInfo = async (id: string) => {
  try {
    await mongooseConnect();
    const result = await findByFilter({ userId: id });

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
