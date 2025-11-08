import { toast } from "react-toastify";
import { loginApi } from "./authApi";

interface Form {
  email: string;
  password: string;
}

export const handleLoginAction = async (form: Form) => {
  const result = await loginApi(form);
  if (result.status === "success") {
    toast.success(result.message);
  } else if (result.status === "error") {
    toast.error(result.message);
  } else {
    toast.info(result.message);
  }
  return result;
};
