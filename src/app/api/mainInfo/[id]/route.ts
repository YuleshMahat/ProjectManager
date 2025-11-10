import { getMainInfo } from "@/controllers/mainInfoController";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  return getMainInfo(id);
}
