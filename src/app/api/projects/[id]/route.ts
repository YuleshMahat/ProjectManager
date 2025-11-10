import { getProjects } from "@/controllers/projectsController";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  return getProjects(id);
}
