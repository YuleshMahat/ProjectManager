import { toast } from "react-toastify";
import { fetchCustomerDetailApi, loginApi } from "./authApi";
import { logout, setUser } from "./authSlice";
import {
  storeAccessToken,
  storeRefreshToken,
} from "@/utils-fe/storageFunction";

interface Form {
  email: string;
  password: string;
}

export const handleLoginAction = (form: Form) => async (dispatch) => {
  const result = await loginApi(form);
  if (result.status === "success") {
    toast.success(result.message);
    storeAccessToken(result.accessToken);
    storeRefreshToken(result.refreshToken);
    dispatch(setUser(result.user));
  } else if (result.status === "error") {
    toast.error(result.message);
  } else {
    toast.info(result.message);
  }
  return result;
};

export const getCustomerDetail = () => async (dispatch) => {
  try {
    const data = await fetchCustomerDetailApi();

    if (data.status === "success") {
      dispatch(setUser(data.customer));
    } else {
      dispatch(setUser(null));
    }
  } catch (err) {
    console.error(err);
  }
};

export const handleLogout = () => (dispatch) => {
  dispatch(logout());
};
