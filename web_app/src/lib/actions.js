"use server";
import axios from "axios";
import { SERVER, defaultSession, sessionOptions } from "./utils";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Adamina } from "next/font/google";


export async function handleRegister(values) {
    try {
        const res = await axios.post(`${SERVER}/user/${values.user}/get-signup-code`, values);
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
            `${SERVER}/confirm-sign-up?${urlParams.toString()}`,
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
            url: `${SERVER}/${values.user}/token`,
            data: `grant_type=&username=${values.username}&password=${values.password}`,
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });

        let user_response = null;
        let user = null;
        if (values.user !== 'admin') {
            try {
                user_response = await axios.get(`${SERVER}/${values.user}/?uni_id=${values.username}`, {
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

            user = {
                userType: values.user,
                firstname: user_response.data.firstname,
                lastname: user_response.data.lastname,
                middlename: user_response.data.middlename,
                email: user_response.data.email,
                is_staff: false,
                uni_id: user_response.data.uni_id,
                phone_no: user_response.data.phone_no,
                id: user_response.data.id,
            }
        } else {
            user = {
                userType: values.user,
                is_staff: false,
                uni_id: 'admin',
            }
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
}

export const handleGetResetCode = async (values) => {
    const session = await getSession();
    if (!session.user) {
        redirect("/login");
    }

    const data = {
        uni_id: session.user.uni_id,
        is_staff: false,
        new_password: values.password
    }

    try {
        const response = await axios.post(`${SERVER}/user/get-reset-code`, data, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: session.access_token,
            }
        })

        return {
            isSuccess: true,
            message: "Confirmation code has been sent to your email!"
        }

    } catch (error) {
        return {
            isSuccess: false,
            message: error.response
                ? error.response.data.detail || "An error has occurred"
                : "Internal server error",
            status: error.response ? error.response.status : 500,
        };
    }
}

export const handleChangePassword = async (value) => {
    const session = await getSession();
    if (!session.user) {
        redirect("/login");
    }
    const uni_id = session.user.uni_id;

    try {
        const response = await axios({
            method: "put",
            url: `${SERVER}/user/confirm-password-reset?uni_id=${uni_id}&email_code=${value.resetCode}`,
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });

        if (response.status === 401 || response.status === 405) {
            return {
                isSuccess: false,
                message: response.detail
            }
        }

        return {
            isSuccess: true,
            message: "Password has been changed successfully!"
        }

    } catch (error) {
        return {
            isSuccess: false,
            message: error.response
                ? error.response.data.detail || "An error has occurred"
                : "Internal server error",
            status: error.response ? error.response.status : 500,
        };
    }
}

/**
 * Fetch books
 */
export const fetchBooks = async () => {
    try {
        const response = await axios({
            method: 'get',
            url: `${SERVER}/user/explore`
        })

        return { isSuccess: true, data: response.data }
    } catch (error) {
        return {
            isSuccess: false,
            message: error.response
                ? error.response.data.detail || "An error has occurred"
                : "Internal server error",
            status: error.response ? error.response.status : 500,
        };
    }
}

/**
 * Get faculties - admin action
 */
export const getFaculties = async () => {
    const session = await getSession();
    if (session.isLoggedIn && session.user.userType === 'admin') {
        try {
            const response = await axios.get(`${SERVER}/admin/faculties`, {
                headers: { Authorization: `bearer ${session.access_token}` },
            })

            return {
                isSuccess: true,
                data: response.data,
            }
        } catch (error) {
            return {
                isSuccess: false,
                message: error.response
                    ? error.response.data.detail || "An error has occurred"
                    : "Internal server error",
                status: error.response ? error.response.status : 500,
            };
        }
    } else {
        redirect('/401');
    }
}

/**
 * add faculty - admin action
 */
export const addFaculty = async (values) => {
    const session = await getSession();
    if (session.isLoggedIn && session.user.userType === 'admin') {
        try {
            const response = await axios({
                method: 'post',
                url: `${SERVER}/admin/add-faculty`,
                data: [{ uni_id: values.uni_id, name: values.name }],
                headers: {
                    Authorization: `bearer ${session.access_token}`,
                }
            })
            return {
                isSuccess: true,
                data: response.data,
            }
        } catch (error) {
            return {
                isSuccess: false,
                message: error.response
                    ? error.response.data.detail || "An error has occurred"
                    : "Internal server error",
                status: error.response ? error.response.status : 500,
            };
        }
    } else {
        redirect('/404');
    }
}

/**
 * Add librarian
 */
export const addLibrarian = async (values) => {
    const session = await getSession();
    if (session.isLoggedIn && session.user.userType === 'admin') {
        try {
            const response = await axios({
                method: 'post',
                url: `${SERVER}/admin/add-librarian`,
                data: { uni_id: values.uni_id, new_password: values.password },
                headers: {
                    Authorization: `bearer ${session.access_token}`,
                }
            });
            return {
                isSuccess: true,
                data: response.data,
            }
        } catch (error) {
            return {
                isSuccess: false,
                message: error.response
                    ? error.response.data.detail || "An error has occurred"
                    : "Internal server error",
                status: error.response ? error.response.status : 500,
            };
        }
    } else {
        redirect('/404');
    }
}

/**
 * Add book
 */
export const addBook = async (data) => {
    const session = await getSession();
    if (session.isLoggedIn && session.user.userType === 'librarian') {
        const lib_id = session.user.uni_id;
        try {
            const response = await axios({
                method: 'post',
                url: `${SERVER}/librarian/add-book?lib_id=${lib_id}`,
                data: data,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `bearer ${session.access_token}`,
                }
            });
            return {
                isSuccess: true
            }
        } catch (error) {
            return {
                isSuccess: false,
                message: error.response
                    ? error.response.data.detail || "An error has occurred"
                    : "Internal server error",
                status: error.response ? error.response.status : 500,
            };
        }

    } else {
        redirect('/404');
    }
}

/**
 * Fetch books
 */
export const getBooks = async () => {
    try {
        const response = await axios.get(`${SERVER}/user/explore`);
        return {
            isSuccess: true,
            data: response.data
        }
    } catch (error) {
        return {
            isSuccess: false,
            message: error.response
                ? error.response.data.detail || "An error has occurred"
                : "Internal server error",
            status: error.response ? error.response.status : 500,
        };
    }
}