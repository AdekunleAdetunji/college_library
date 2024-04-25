import { getSession } from '@/lib/actions'
import { redirect } from 'next/navigation';
import React from 'react'

const borrowed = async () => {
    const session = await getSession();
    if (!session.isLoggedIn) {
        redirect('/login');
    }

    return (
        <div>borrowed</div>
    )
}

export default borrowed