import { apiProcessor, apiUrl } from "@/utils-fe/apiProcessor";

export const getSkillsApi = (id: string) => {
  return apiProcessor({
    method: "get",
    url: `${apiUrl}/skills/${id}`,
  });
};

export const deleteSkillApi = (userId: string, skills: string[]) => {
  return apiProcessor({
    method: "patch",
    url: `${apiUrl}/skills`,
    data: { userId, skills }, // body for DELETE request
  });
};

export const addSkillApi = (userId: string, skill: string) => {
  return apiProcessor({
    method: "patch",
    url: `${apiUrl}/skills`,
    data: {
      userId,
      skills: [skill], // backend expects array even for single add
    },
  });
};
