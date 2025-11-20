import { getMainInfo } from "@/controllers/mainInfoController";

export async function GET(req: Request) {
  return getMainInfo(req);
}
