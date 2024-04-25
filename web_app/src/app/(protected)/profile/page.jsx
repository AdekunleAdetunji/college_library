import { getSession } from '@/lib/actions'
import { redirect } from 'next/navigation';
import React from 'react'

const Profile = async () => {
    const session = await getSession();
    if (!session.isLoggedIn) {
        redirect("/login");
    }

    return (
        <div className='w-full pt-12 flex flex-col items-center'>
            <h1 className='text-center text-5xl mb-12'>Profile</h1>
            <div className='flex items-center w-full'>
                <div className='flex items-center w-full'>
                    <label>Firstname</label>
                    <input className='text-center' value={session.user.firstname} disabled />
                </div>
            </div>
        </div>
    )
}

export default Profile