"use client";
import { handleLogin } from "@/lib/actions";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginForm = () => {
    const route = useRouter();

    const [uni_id, setUniID] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('user');
    const [error, setError] = useState('');

    const hanldeUniIDChange = (e) => {
        setUniID(e.target.value)
    }

    const hanldePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleUserTypeChange = (e) => {
        setUserType(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await handleLogin({ username: uni_id, password: password, user: userType })
            if (response.isSuccess) {
                route.push("/books");
            } else {
                setError(response.message)
            }
        } catch (error) {
            setError(error.message);
        }
    }
    return (
        <div className="py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div
                    className="absolute inset-0 bg-gradient-to-r from-blue-100 to-gray-900 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                </div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md mx-auto">
                        <div>
                            <h1 className="text-2xl font-semibold">Login</h1>
                        </div>
                        <div className="divide-y divide-gray-200">
                            <form onSubmit={handleSubmit} className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <div className='flex flex-row items-center gap-3 mb-4'>
                                    <div className="flex items-center">
                                        <input defaultChecked={userType === 'user'} id="student" type="radio" value="user" name="user_type" onChange={handleUserTypeChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" />
                                        <label htmlFor="student" className="ms-2 text-sm font-medium text-gray-900 ">Student</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input defaultChecked={userType === 'librarian'} id="staff" type="radio" value="librarian" name="user_type" onChange={handleUserTypeChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" />
                                        <label htmlFor="staff" className="ms-2 text-sm font-medium text-gray-900">Staff</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input defaultChecked={userType === 'admin'} id="admin" type="radio" value="admin" name="user_type" onChange={handleUserTypeChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" />
                                        <label htmlFor="admin" className="ms-2 text-sm font-medium text-gray-900">Admin</label>
                                    </div>
                                </div>
                                <div className="relative">
                                    <input autoComplete="off" id="uni_id" name="username" value={uni_id} onChange={hanldeUniIDChange} type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="UNI ID" required />
                                    <label htmlFor="uni_id" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">UNI ID</label>
                                </div>
                                <div className="relative">
                                    <input autoComplete="off" id="password" name="password" type="password" value={password} onChange={hanldePasswordChange} className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" required />
                                    <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                                </div>
                                <div className="relative">
                                    <button type="submit" className="bg-gray-800 border-2 border-gray-800 hover:bg-white hover:text-gray-800 text-white rounded-md px-2 py-1 transition duration-300">Submit</button>
                                </div>
                                {error !== '' && <p className="text-red-600">{error}</p>}
                            </form>
                            <Link href='/register' className='text-blue-600 cursor-pointer'>Create an account.</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
