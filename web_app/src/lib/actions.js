"use server";
import axios from "axios";
import { SERVER } from "./utils";
import { signIn } from "../../auth";


export async function handleRegister(values) {
    try {
        const res = await axios.post(`${SERVER}/get-signup-code`, values);
        return { status: res.status, message: "success", isSuccess: true };
    } catch (error) {
        return {
            isSuccess: false,
            message: (error).response
                ? ((error).response?.data)
                    ?.detail || "An error as occured"
                : "Internal server error",
            status: (error).response?.status || 500,
        };
    }
}

export async function handleConfirmRegistration(values) {
    const urlParams = new URLSearchParams();
    urlParams.append("uni_id", values.uni_id)
    urlParams.append("email_code", values.email_code)
    try {
        console.log(values)
        const res = await axios.post(
            `${SERVER}/sign-up?${urlParams.toString()}`,
            values
        );
        return { status: res.status, message: "success", isSuccess: true };
    } catch (error) {
        return {
            isSuccess: false,
            message: (error).response
                ? ((error).response?.data)
                    ?.detail || "An error as occured"
                : "Internal server error",
            status: (error).response?.status || 500,
        };
    }
}

export async function handleLogin(values) {

    try {
        await signIn("credentials", values);
    } catch (error) {

    }
}