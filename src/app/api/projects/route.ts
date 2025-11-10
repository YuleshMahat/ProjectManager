import { addNewProject, getProjects } from "@/controllers/projectsController";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  return addNewProject(req);
}
