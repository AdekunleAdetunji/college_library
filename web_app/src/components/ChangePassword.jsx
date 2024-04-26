"use client"
import { handleChangePassword, handleGetResetCode } from '@/lib/actions';
import React, { useEffect, useState } from 'react'
import { Toaster, toast } from 'sonner';

const ChangePassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [resetCode, setResetCode] = useState('');
    const [passwordChanged, setPasswordChanged] = useState(false);
    const [disableGetCode, setDisableGetCode] = useState(false);
    const [timer, setTimer] = useState(600);
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

    const handleResetCodeChange = (e) => {
        setResetCode(e.target.value);
    }

    const handleGetCode = async () => {
        if (password !== confirmPassword) {
            setPasswordsMatch(false);
            setError("Passwords don't match")
        } else {
            const response = await handleGetResetCode({ password });
            if (!response.isSuccess) {
                setError(response.message[0].msg);
                toast.error(response.message[0].msg);
            } else {
                setDisableGetCode(true);
                setTimer(600);
                toast.success(response.message);
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setPasswordsMatch(false);
            setError("Passwords don't match")
        } else {
            console.log("reset code", resetCode);
            const response = await handleChangePassword({ resetCode });
            if (!response.isSuccess) {
                setError(response.message);
                toast.error(response.message);
            } else {
                setPasswordChanged(true);
                toast.success(response.message);
            }
        }
    }

    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTime) => prevTime - 1);
            }, 1000);
        } else {
            setDisableGetCode(false);
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [disableGetCode]);

    return (
        <div className='mb-12'>
            <h2 className='text-xl font-bold mb-4 flex flex-col w-full md:w-1/2 md:max-w-96 justify-center py-10 items-center'>Reset Password</h2>
            {!passwordChanged && <form className='w-full' onSubmit={handleSubmit}>
                <div className="relative rounded mb-5">
                    <input id="password" name="password" type="password" min={8} value={password} onChange={handlePasswordChange} className="border-b-2 border-gray-300 p-2 peer placeholder-transparent h-10 w-full text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" required />
                    <label htmlFor="password" className="absolute left-2 -top-3.5 text-gray-400 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                </div>

                <div className="relative rounded mb-5">
                    <input id="confirm_password" name="confirm_password" type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} className={`border-b-2 ${passwordsMatch ? 'border-gray-300 bg-white' : 'border-red-600 bg-red-100'} p-2 peer placeholder-transparent h-10 w-full text-gray-900 focus:outline-none focus:borer-rose-600`} placeholder="Confirm Password" required />
                    <label htmlFor="confirm_password" className="absolute left-2 -top-4 text-gray-400 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Confirm Password</label>
                </div>
                <div className="relative rounded mb-5 flex gap-2">
                    <input id="confirmation_code" name="confirmation_code" type="number" value={resetCode} onChange={handleResetCodeChange}
                        className="border-b-2 border-gray-300 bg-white p-2 peer placeholder-transparent h-10 w-full text-gray-900 focus:outline-none focus:borer-rose-600 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        placeholder="Confirmation Code"
                        required />
                    <label htmlFor="confirmation_code" className="absolute left-2 -top-4 text-gray-400 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Confirmation Code</label>
                    <button type='button'
                        disabled={disableGetCode}
                        onClick={async () => { await handleGetCode() }} className='bg-blue-600 rounded w-28 text-white px-1'>
                        {disableGetCode ? `${Math.floor(timer / 60)}:${timer % 60 < 10 ? '0' : ''}${timer % 60}` : 'Get Code'}
                    </button>
                </div>
                <button type="submit" className="block w-full mt-4 py-2 font-semibold mb-2 text-white bg-gray-800 hover:bg-white hover:text-gray-800 border-2 border-gray-800 rounded-md transition duration-300">
                    Change Password
                </button>

                {error !== '' && <p className='text-red-500'>{error}</p>}
            </form>}
            {passwordChanged && <div className='flex justify-center items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-10 h-10 fill-current text-green-600">
                    <path d="M426.072,86.928A238.75,238.75,0,0,0,88.428,424.572,238.75,238.75,0,0,0,426.072,86.928ZM257.25,462.5c-114,0-206.75-92.748-206.75-206.75S143.248,49,257.25,49,464,141.748,464,255.75,371.252,462.5,257.25,462.5Z"></path>
                    <polygon points="221.27 305.808 147.857 232.396 125.23 255.023 221.27 351.063 388.77 183.564 366.142 160.937 221.27 305.808"></polygon>
                </svg>
            </div>}
            <Toaster />
        </div>
    )
}

export default ChangePassword