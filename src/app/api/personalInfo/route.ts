import { updatePersonalInfo } from "@/controllers/personalInfoController";
import { NextRequest } from "next/server";

export async function PATCH(req: NextRequest) {
  return updatePersonalInfo(req);
}
