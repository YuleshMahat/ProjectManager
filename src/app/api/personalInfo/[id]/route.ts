import { getPersonalInfo } from "@/controllers/personalInfoController";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  return getPersonalInfo(id);
}
