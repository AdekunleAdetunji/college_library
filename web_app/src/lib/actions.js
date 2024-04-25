"use server";
import axios from "axios";
import { SERVER, defaultSession, sessionOptions } from "./utils";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


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

export const getSession = async () => {
    const session = await getIronSession(cookies(), sessionOptions);

    if (!session.isLoggedIn) {
        session.isLoggedIn = defaultSession.isLoggedIn;
    }
    return session;
}

export async function handleLogin(values) {

    const session = await getSession();

    try {
        const response = await axios({
            method: "post",
            url: 'http://localhost:8000/user/token',
            data: `grant_type=&username=${values.username}&password=${values.password}`,
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });

        let user_response = null;
        try {
            user_response = await axios.get(`http://localhost:8000/user/?uni_id=${values.username}`, {
                headers: { Authorization: `bearer ${response.data.access_token}` },
            });


        } catch (error) {
            return {
                isSuccess: false,
                message: error.response
                    ? error.response.data.detail || "An error has occurred"
                    : "Internal server error",
                status: error.response ? error.response.status : 500,
            };
        }

        const user = {
            firstname: user_response.data.firstname,
            lastname: user_response.data.lastname,
            middlename: user_response.data.middlename,
            email: user_response.data.email,
            uni_id: user_response.data.uni_id,
            phone_no: user_response.data.phone_no,
            id: user_response.data.id,
        }
        session.access_token = response.data.access_token;
        session.token_type = response.data.token_type;
        session.createdAt = Date.now();
        session.user = user;

        session.isLoggedIn = true;
        await session.save();

        return {
            status: response.status,
            message: "login success",
            isSuccess: true,
            data: response.data,
        };
    } catch (error) {
        console.log(error);
        return {
            isSuccess: false,
            message: error.response
                ? error.response.data.detail || "An error has occurred"
                : "Internal server error",
            status: error.response ? error.response.status : 500,
        };
    }
}

export const LogOut = async () => {
    const session = await getSession();
    session.destroy();
    redirect("/");
}