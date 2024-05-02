import LibrarianDashboard from '@/components/LibrarianDashboard'
import { getSession } from '@/lib/actions'
import { redirect } from 'next/navigation';
import React from 'react'

const LibDashboard = async () => {
    const session = await getSession();
    if (!session.isLoggedIn) {
        redirect('/login');
    } else if (session.isLoggedIn && session.user.userType !== 'librarian') {
        redirect('/404');
    }

    return (
        <div className='w-full p-4'>
            <h1 className='text-2xl md:text-4xl'>Librarian Dashboard</h1>
            <LibrarianDashboard />
        </div>
    )
}

export default LibDashboard