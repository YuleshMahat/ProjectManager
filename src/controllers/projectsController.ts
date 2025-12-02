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
    await mongooseConnect();

    const user = await requireAuth(req);

    const { file, body } = await extractImage(req);

    const { name, image, skills, github, live, description, featured } = body;
    console.log(body);

    let imageUrl = "";

    if (!file) {
      console.log("file is null");
      imageUrl = image;
    } else {
      console.log("Inside if block of file and file is", file);
      const uploadedImagePath = await uploadImage(file);

      if (!uploadedImagePath)
        return NextResponse.json(
          { status: "error", message: "Error uploading image" },
          { status: 500 }
        );
      imageUrl = uploadedImagePath;
    }

    if (!name || !github || !live) {
      return NextResponse.json(
        { error: "Missing required fields: name, github, live" },
        { status: 400 }
      );
    }

    console.log("image URL", imageUrl);

    const project = await createProject({
      userId: user._id,
      name: name.trim(),
      image: imageUrl,
      skills,
      github: github.trim(),
      live: live.trim(),
      description: description?.trim(),
      featured,
      order: 0,
    });

    return NextResponse.json(
      {
        status: "success",
        message: "Project added successfully!",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.log("Add Project Error:", error.message);
    return NextResponse.json(
      {
        status: "error",
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
};

export const getProjects = async (id: string) => {
  try {
    // 1. Connect DB
    await mongooseConnect();
    if (!id) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }
    const projects = await getUserProjects(id);

    return NextResponse.json(
      {
        message: "Projects fetched successfully",
        data: projects,
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
