import { getSession } from '@/lib/actions'
import { redirect } from 'next/navigation';
import React from 'react'

const page = async () => {

    const session = await getSession();
    if (!session.isLoggedIn) {
        redirect("/books/borrowed");
    }

    return (
        <div>My Books</div>
    )
}

export default page