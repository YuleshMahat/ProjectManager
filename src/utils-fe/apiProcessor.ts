import axios from "axios";
import { getAccessToken } from "./storageFunction";

export const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL + "/api";

interface apiProcessorParams {
  method: "get" | "post" | "put" | "delete" | "patch";
  url: string;
  data?: any;
  isPrivate?: boolean;
}

export const apiProcessor = async ({
  method,
  url,
  data,
  isPrivate = true,
}: apiProcessorParams) => {
  try {
    let response = await axios({
      method,
      url,
      data,
      headers: isPrivate ? { Authorization: getAccessToken() } : {},
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "An error occurred while processing your request.",
    };
  }
};
