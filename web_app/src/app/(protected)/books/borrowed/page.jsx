import BorrowedBooksTable from '@/components/BorrowedBooksTable';
import { getSession } from '@/lib/actions'
import { redirect } from 'next/navigation';
import React from 'react'

const borrowed = async () => {
    const session = await getSession();
    if (!session.isLoggedIn) {
        redirect('/login');
    }

    return (
        <div className='w-full p-6'>
            <h1 className='text-2xl md:text-3xl'>My Borrowed Books</h1>
            <BorrowedBooksTable />
        </div>
    )
}

export default borrowed