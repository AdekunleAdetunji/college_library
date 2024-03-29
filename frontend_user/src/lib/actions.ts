"use server";
import axios, { AxiosError } from "axios";
import { SERVER } from "./utils";

export async function register(values: {
  uni_id: string;
  new_password: string;
  is_staff: boolean;
}) {
  try {
    const res = await axios.post(`${SERVER}/get-signup-code`, values);
    return { status: res.status, message: "success", isSuccess: true };
  } catch (error) {
    return {
      isSuccess: false,
      message: (error as AxiosError).response
        ? ((error as AxiosError).response?.data as { detail?: string })
            ?.detail || "An error as occured"
        : "Internal server error",
      status: (error as AxiosError).response?.status || 500,
    };
  }
}

export async function signUp(values: { uni_id: string; email_code: string }) {
  console.log(values);
  const urlParams = new URLSearchParams();
  urlParams.append("uni_id", values.uni_id);
  urlParams.append("email_code", values.email_code);

  try {
    const res = await axios.post(
      `${SERVER}/sign-up?${urlParams.toString()}`,
      values
    );
    return { status: res.status, message: "success", isSuccess: true };
  } catch (error) {
    return {
      isSuccess: false,
      message: (error as AxiosError).response
        ? ((error as AxiosError).response?.data as { detail?: string })
            ?.detail || "An error as occured"
        : "Internal server error",
      status: (error as AxiosError).response?.status || 500,
    };
  }
}

export async function getPasswordResetCode(values: {
  uni_id: string;
  new_password: string;
}) {
  const res = await axios.post(`${SERVER}/get-reset-code`, values);
  return res;
}

export async function signIn(values: { uni_id: string; password: string }) {
  const data = new FormData();
  data.append("username", values.uni_id);
  data.append("password", values.password);
  try {
    const res = await axios({
      method: "post",
      url: `${SERVER}/token`,
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    });
    return {
      status: res.status,
      message: "login success",
      isSuccess: true,
      data: res.data,
    };
  } catch (error) {
    return {
      isSuccess: false,
      message: (error as AxiosError).response
        ? ((error as AxiosError).response?.data as { detail?: string })
            ?.detail || "An error as occured"
        : "Internal server error",
      status: (error as AxiosError).response?.status || 500,
    };
  }
}

export async function resetPassword(values: {
  uni_id: string;
  email_code: string;
}) {
  const res = await axios.put(`${SERVER}/reset-password`, values);
  return res;
}

export async function getUser(uni_id: string, token: string) {
  try {
    const res = await axios.get(`${SERVER}/?uni_id=${uni_id}`, {
      headers: { Authorization: `bearer ${token}` },
    });

    return {
      status: res.status,
      message: "success",
      isSuccess: true,
      data: res.data,
    };
  } catch (error) {
    return {
      isSuccess: false,
      message: (error as AxiosError).response
        ? ((error as AxiosError).response?.data as { detail?: string })
            ?.detail || "An error as occured"
        : "Internal server error",
      status: (error as AxiosError).response?.status || 500,
    };
  }
}
