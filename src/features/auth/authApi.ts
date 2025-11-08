import { apiProcessor, apiUrl } from "@/utils-fe/apiProcessor";

interface Form {
  email: string;
  password: string;
}
export const loginApi = (form: Form) => {
  console.log(apiUrl);
  return apiProcessor({
    method: "post",
    url: `${apiUrl}/auth/login`,
    data: form,
  });
};
