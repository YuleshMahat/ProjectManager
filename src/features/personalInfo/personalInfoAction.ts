// features/personalInfo/personalInfoActions.ts
import { AppDispatch } from "@/redux/store";
import { updatePersonalInfo } from "@/features/personalInfo/personalInfoSlice";
import { toast } from "react-toastify";
import { fetchPersonalInfoApi, updatePersonalInfoApi } from "./personalInfoApi";

interface PersonalInfoForm {
  name: string;
  email: string;
  title: string;
  github: string;
  linkedin: string;
}

interface ApiResponse<T> {
  status: "success" | "error";
  message?: string;
  data?: T;
}

export const handlePersonalInfoUpdate =
  (id: string, form: PersonalInfoForm) => async (dispatch: AppDispatch) => {
    try {
      const result: ApiResponse<any> = await updatePersonalInfoApi(id, form);

      if (result.status === "success") {
        dispatch(fetchPersonalInfo(id));
        toast.success("Personal info updated like a boss!");
        return result;
      } else {
        toast.error(result.message || "Failed to update info");
        return result;
      }
    } catch (error: any) {
      toast.error("Update failed. Try again, legend.");
      console.error("Personal Info Update Error:", error);
      throw error;
    }
  };

export const fetchPersonalInfo =
  (userId: string) => async (dispatch: AppDispatch) => {
    try {
      const result: ApiResponse<any> = await fetchPersonalInfoApi(userId);

      if (result.status === "success") {
        dispatch(updatePersonalInfo(result.data || result.data || {}));
        toast.success("Personal info loaded like a boss!");
        return result;
      } else {
        toast.error(result.message || "Failed to fetch info");
        return result;
      }
    } catch (error: any) {
      toast.error("Fetch failed. Try again, legend.");
      console.error("Personal Info Fetch Error:", error);
      throw error;
    }
  };
