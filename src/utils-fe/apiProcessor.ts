import axios from "axios";

export const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL + "/api";

interface apiProcessorParams {
  method: "get" | "post" | "put" | "delete" | "patch";
  url: string;
  data?: any;
}

export const apiProcessor = async ({
  method,
  url,
  data,
}: apiProcessorParams) => {
  try {
    let response = await axios({ method, url, data });
    //response from backend expample: {status: "success", message: "Login successful", user}
    return response.data;
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "An error occurred while processing your request.",
    };
  }
};
