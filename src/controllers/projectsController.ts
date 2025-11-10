import { mongooseConnect } from "@/lib/config/mongoConfig";
import { parseJSON } from "@/lib/utils/parseJson";
import {
  createProject,
  getUserProjects,
} from "@/models/projects/projectsModel";
import { NextRequest, NextResponse } from "next/server";

export const addNewProject = async (req: NextRequest) => {
  try {
    // 2. Connect DB
    await mongooseConnect();

    // 3. Parse body
    const body = await parseJSON(req);
    const {
      userId,
      name,
      image,
      skills = [],
      github,
      live,
      description,
      featured = false,
    } = body;

    console.log(body);

    // 4. Basic validation
    if (!name || !image || !github || !live) {
      return NextResponse.json(
        { error: "Missing required fields: name, image, github, live" },
        { status: 400 }
      );
    }

    // 5. Create project via your controller
    const project = await createProject({
      userId,
      name: name.trim(),
      image,
      skills,
      github: github.trim(),
      live: live.trim(),
      description: description?.trim(),
      featured,
      order: 0, // will be reordered later if needed
    });

    // 6. Success response
    return NextResponse.json(
      {
        message: "Project added successfully!",
        project,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Add Project Error:", error);
    return NextResponse.json(
      {
        error: error.message || "Failed to add project",
      },
      { status: 500 }
    );
  }
};

export const getProjects = async (id: string) => {
  try {
    // 1. Connect DB
    await mongooseConnect();

    // 2. Parse body (you pass userId here from frontend)
    // 3. Validate userId
    if (!id) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    // 4. Fetch projects using your existing controller
    // Assuming you have this in your projectsModel:
    // import { getUserProjects } from "@/models/projects/projectsModel";
    const projects = await getUserProjects(id);

    // 5. Success
    return NextResponse.json(
      {
        message: "Projects fetched successfully",
        projects,
        count: projects.length,
        status: "success",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Get Projects Error:", error);
    return NextResponse.json(
      { status: "error", message: error.message || "Failed to fetch projects" },
      { status: 500 }
    );
  }
};
