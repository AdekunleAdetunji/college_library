"use client"
import { handleConfirmRegistration } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const ConfirmRegistration = () => {
    const router = useRouter();

    const [error, setError] = useState('');
    const [uni_id, setUniID] = useState('');
    const [email_code, setEmailCode] = useState('');

    const handleUniIDChange = (e) => {
        setUniID(e.target.value)
    }
    const handleEmailCode = (e) => {
        setEmailCode(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await handleConfirmRegistration({
                uni_id,
                email_code
            });

            if (response.isSuccess) {
                router.push('/login')
            } else {
                setError(response.message);
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="w-full md:flex md:justify-center max-md:px-8">
            <div className="flex flex-col md:w-1/2 justify-center py-10 items-center bg-white">
                <form className="bg-white w-full" onSubmit={handleSubmit}>
                    <h1 className="text-gray-800 font-bold text-2xl mb-8">Confirm Registration</h1>
                    <p>The confirmation code has been sent to your email.</p>
                    <div className="relative rounded mb-5">
                        <input id="uni_id" name="uni_id" type="text" value={uni_id} onChange={handleUniIDChange} className="border-b-2 border-gray-300 p-2 peer placeholder-transparent h-10 w-full text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="UNI ID" required />
                        <label htmlFor="uni_id" className="absolute left-2 -top-3.5 text-gray-400 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">UNI ID</label>
                    </div>

                    <div className="relative rounded mb-5">
                        <input id="email_code" name="email_code" type="number" value={email_code} onChange={handleEmailCode} className="border-b-2 border-gray-300 bg-white p-2 peer placeholder-transparent h-10 w-full text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Confirm Password" required />
                        <label htmlFor="email_code" className="absolute left-2 -top-4 text-gray-400 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Code</label>
                    </div>

                    <button type="submit" className="block w-full mt-4 py-2 font-semibold mb-2 text-white bg-gray-800 hover:bg-white hover:text-gray-800 border-2 border-gray-800 rounded-md transition duration-300">Login</button>
                </form>
                {error !== '' && <p className='text-red-500'>{error}</p>}
            </div>
        </div>
    )
}

export default ConfirmRegistration