import ChangePassword from '@/components/ChangePassword';
import { getSession } from '@/lib/actions'
import { redirect } from 'next/navigation';
import React from 'react'

const Profile = async () => {
    const session = await getSession();
    if (!session.isLoggedIn) {
        redirect("/login");
    }

    return (
        <div className='w-full pt-12 flex flex-col items-center relative'>
            <div className='w-24 h-full bg-slate-200 absolute top-0 left-0 -z-10 hidden md:flex text-center md:justify-center md:items-center text-6xl font-extrabold'
                style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
                College Library
            </div>
            <h1 className='text-center text-5xl mb-12'>Profile</h1>
            <div className='flex flex-col gap-4 sm:gap-6 justify-center items-center w-full'>
                <div className='flex max-sm:flex-col justify-center items-center sm:gap-4 w-full'>
                    <label className='text-left max-sm:w-full sm:w-24 sm:text-right max-md:ml-6 max-md:mb-1'>UNI ID:</label>
                    <input className='text-center py-1 bg-slate-200 rounded-sm' value={session.user.uni_id} disabled />
                </div>

                <div className='flex max-sm:flex-col justify-center items-center sm:gap-4 w-full'>
                    <label className='text-left max-sm:w-full sm:w-24 sm:text-right max-md:ml-6 max-md:mb-1'>Firstname:</label>
                    <input className='text-center py-1 bg-slate-200 rounded-sm' value={session.user.firstname} disabled />
                </div>

                <div className='flex max-sm:flex-col justify-center items-center sm:gap-4 w-full'>
                    <label className='text-left max-sm:w-full sm:w-24 sm:text-right max-md:ml-6 max-md:mb-1'>Lastname:</label>
                    <input className='text-center py-1 bg-slate-200 rounded-sm' value={session.user.lastname} disabled />
                </div>

                <div className='flex max-sm:flex-col justify-center items-center sm:gap-4 w-full'>
                    <label className='text-left max-sm:w-full sm:w-24 sm:text-right max-md:ml-6 max-md:mb-1'>Email:</label>
                    <input className='text-center py-1 bg-slate-200 rounded-sm' value={session.user.email} disabled />
                </div>

                <div className='flex max-sm:flex-col justify-center items-center sm:gap-4 w-full'>
                    <label className='text-left max-sm:w-full sm:w-24 sm:text-right max-md:ml-6 max-md:mb-1'>Phone:</label>
                    <input className='text-center py-1 bg-slate-200 rounded-sm' value={session.user.phone_no} disabled />
                </div>
            </div>
            <hr className='w-96 bg-slate-200 text-slate-200 my-8' />

            <ChangePassword />
        </div>
    )
}

export default Profile