"use client"

import { handleRegister } from '@/lib/actions';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import React, { useState } from 'react'

const register = () => {
  const router = useRouter();

  const [uni_id, setUniID] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const [error, setError] = useState('')

  const handleUniIDChange = (e) => {
    setUniID(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (confirmPassword !== e.target.value) {
      setPasswordsMatch(false)
    } else {
      setPasswordsMatch(true)
    }
  }

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (password !== e.target.value) {
      setPasswordsMatch(false)
    } else {
      setPasswordsMatch(true)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordsMatch(false);
      return;
    }

    try {
      const response = await handleRegister({
        uni_id: uni_id,
        is_staff: false,
        new_password: password
      })

      if (response.isSuccess) {
        return router.push(`/register/confirm_registration?uni_id=${uni_id}`);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="w-full flex justify-center max-md:px-4">
      <div className="flex flex-col w-full md:w-1/2 md:max-w-96 justify-center py-10 items-center bg-white">
        <form className="bg-white w-full" onSubmit={handleSubmit}>
          <h1 className="text-gray-800 font-bold text-2xl mb-8">Reigster</h1>

          <div className="relative rounded mb-5">
            <input id="uni_id" name="uni_id" type="text" value={uni_id} onChange={handleUniIDChange} className="border-b-2 border-gray-300 p-2 peer placeholder-transparent h-10 w-full text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="UNI ID" required />
            <label htmlFor="uni_id" className="absolute left-2 -top-3.5 text-gray-400 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">UNI ID</label>
          </div>

          <div className="relative rounded mb-5">
            <input id="password" name="password" type="password" value={password} onChange={handlePasswordChange} className="border-b-2 border-gray-300 p-2 peer placeholder-transparent h-10 w-full text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" required />
            <label htmlFor="password" className="absolute left-2 -top-3.5 text-gray-400 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
          </div>

          <div className="relative rounded mb-5">
            <input id="confirm_password" name="confirm_password" type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} className={`border-b-2 ${passwordsMatch ? 'border-gray-300 bg-white' : 'border-red-600 bg-red-100'} p-2 peer placeholder-transparent h-10 w-full text-gray-900 focus:outline-none focus:borer-rose-600`} placeholder="Confirm Password" required />
            <label htmlFor="confirm_password" className="absolute left-2 -top-4 text-gray-400 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Confirm Password</label>
          </div>

          <button type="submit" className="block w-full mt-4 py-2 font-semibold mb-2 text-white bg-gray-800 hover:bg-white hover:text-gray-800 border-2 border-gray-800 rounded-md transition duration-300">Login</button>
        </form>
        {error !== '' && <p className='text-red-500'>{error}</p>}
        <p className='text-gray-800'>You alrady have an account? <Link href='/login' className='text-blue-600 cursor-pointer'>Login.</Link></p>
      </div>
    </div>
  )
}

export default register