// api/personalInfoApi.ts
import { apiProcessor, apiUrl } from "@/utils-fe/apiProcessor";

interface PersonalInfoForm {
  name: string;
  email: string;
  title: string;
  github: string;
  linkedin: string;
}

export const updatePersonalInfoApi = (id: string, form: PersonalInfoForm) => {
  return apiProcessor({
    method: "patch",
    url: `${apiUrl}/personalInfo`,
    data: { id, ...form },
  });
};

export const fetchPersonalInfoApi = (id: string) => {
  return apiProcessor({
    method: "get",
    url: `${apiUrl}/personalInfo/${id}`,
  });
};
