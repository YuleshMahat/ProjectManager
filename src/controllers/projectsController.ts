import { mongooseConnect } from "@/lib/config/mongoConfig";
import { requireAuth } from "@/lib/utils/auth";
import { extractImage, uploadImage } from "@/lib/utils/imageHelper";
import { parseJSON } from "@/lib/utils/parseJson";
import {
  createProject,
  deleteProject,
  updateProject,
  getUserProjects,
} from "@/models/projects/projectsModel";
import { NextRequest, NextResponse } from "next/server";

export const addNewProject = async (req: NextRequest) => {
  try {
    // 2. Connect DB
    await mongooseConnect();

    // 3. Parse body
    const user = await requireAuth(req);

    const { file, body } = await extractImage(req);

    const {
      name,
      image,
      skills = [],
      github,
      live,
      description,
      featured = false,
    } = body;

    console.log(file);
    const uploadedImagePath = await uploadImage(file);

    if (!uploadedImagePath)
      return NextResponse.json(
        { status: "error", message: "Error uploading image" },
        { status: 500 }
      );

    if (!name || !github || !live) {
      return NextResponse.json(
        { error: "Missing required fields: name, github, live" },
        { status: 400 }
      );
    }

    const project = await createProject({
      userId: user._id,
      name: name.trim(),
      image,
      skills,
      github: github.trim(),
      live: live.trim(),
      description: description?.trim(),
      featured,
      order: 0, // will be reordered later if needed
    });

    return;
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

export const deleteAProject = async (req: NextRequest) => {
  try {
    // 1. Connect to DB
    await mongooseConnect();

    // 3. Parse request body
    const body = await parseJSON(req);
    const { projectId } = body;

    if (!projectId || typeof projectId !== "string") {
      return NextResponse.json(
        {
          status: "error",
          message: "projectId is required and must be a string",
        },
        { status: 400 }
      );
    }

    // 4. Find & delete project (only if owned by user)
    const deletedProject = await deleteProject(projectId);

    if (!deletedProject) {
      return NextResponse.json(
        { status: "error", message: "Project not found or unauthorized" },
        { status: 404 }
      );
    }

    // 5. Success!
    return NextResponse.json(
      {
        status: "success",
        message: "Project deleted successfully",
        data: { id: deletedProject._id },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("DELETE /api/projects/delete error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: error.message,
      },
      { status: 500 }
    );
  }
};

export const updateAProject = async (req: NextRequest) => {
  try {
    await mongooseConnect();
    // 2. Parse body
    const body = await parseJSON(req);
    const { id, ...updates } = body;
    console.log(body);

    if (!id) {
      return NextResponse.json(
        { status: "error", message: "Project ID is required" },
        { status: 400 }
      );
    }

    // 3. Find and update — only if owned by user
    const updatedProject = await updateProject(id, updates);

    if (!updatedProject) {
      return NextResponse.json(
        { status: "error", message: "Project not found or unauthorized" },
        { status: 404 }
      );
    }

    // 4. SUCCESS!
    return NextResponse.json({
      status: "success",
      message: "Project updated successfully",
      project: updatedProject,
    });
  } catch (error: any) {
    console.error("PATCH /api/projects error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Internal server error",
        error: error.message,
      },
      { status: 500 }
    );
  }
};
