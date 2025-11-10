// models/projects/projectController.ts
import Project from "./projectsSchema";

export const getUserProjects = (userId: string) => {
  return Project.find({ userId }).sort({
    featured: -1,
    order: -1,
    createdAt: -1,
  });
};

export const createProject = (projectData: any) => {
  return Project.create(projectData);
};

export const updateProject = (id: string, updateData: any) => {
  return Project.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteProject = (id: string) => {
  return Project.findByIdAndDelete(id);
};

export const reorderProjects = (userId: string, orderedIds: string[]) => {
  const bulkOps = orderedIds.map((id, index) => ({
    updateOne: {
      filter: { _id: id, userId },
      update: { order: index },
    },
  }));
  return Project.bulkWrite(bulkOps);
};
