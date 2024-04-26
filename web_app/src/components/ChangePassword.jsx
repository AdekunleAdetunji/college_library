"use client"
import { handleChangePassword } from '@/lib/actions';
import React, { useState } from 'react'
import { Toaster, toast } from 'sonner';

const ChangePassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [error, setError] = useState('');

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (confirmPassword !== e.target.value) {
            setPasswordsMatch(false)
        } else {
            setPasswordsMatch(true);
            setError('');
        }
    }

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        if (password !== e.target.value) {
            setPasswordsMatch(false)
        } else {
            setPasswordsMatch(true)
            setError('');
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setPasswordsMatch(false);
            setError("Passwords don't match")
        } else {
            const response = await handleChangePassword({ password });
            console.log(response)
            if (!response.isSuccess) {
                setError(response.message[0].msg);
                toast.error(response.message[0].msg);
            } else {
                toast.success(response.message);
            }
        }
    }

    return (
        <div className='mb-12'>
            <h2 className='text-xl font-bold mb-4 flex flex-col w-full md:w-1/2 md:max-w-96 justify-center py-10 items-center'>Reset Password</h2>
            <form className='w-full' onSubmit={handleSubmit}>
                <div className="relative rounded mb-5">
                    <input id="password" name="password" type="password" min={8} value={password} onChange={handlePasswordChange} className="border-b-2 border-gray-300 p-2 peer placeholder-transparent h-10 w-full text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" required />
                    <label htmlFor="password" className="absolute left-2 -top-3.5 text-gray-400 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                </div>

                <div className="relative rounded mb-5">
                    <input id="confirm_password" name="confirm_password" type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} className={`border-b-2 ${passwordsMatch ? 'border-gray-300 bg-white' : 'border-red-600 bg-red-100'} p-2 peer placeholder-transparent h-10 w-full text-gray-900 focus:outline-none focus:borer-rose-600`} placeholder="Confirm Password" required />
                    <label htmlFor="confirm_password" className="absolute left-2 -top-4 text-gray-400 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Confirm Password</label>
                </div>
                <button type="submit" className="block w-full mt-4 py-2 font-semibold mb-2 text-white bg-gray-800 hover:bg-white hover:text-gray-800 border-2 border-gray-800 rounded-md transition duration-300">
                    Change Password
                </button>
                {error !== '' && <p className='text-red-500'>{error}</p>}
            </form>
            <Toaster />
        </div>
    )
}

export default ChangePassword