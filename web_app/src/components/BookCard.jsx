import { getSession } from '@/lib/actions'
import Link from 'next/link'
import React from 'react'

const BookCard = async ({ title, description, id }) => {
    const session = await getSession();

    return (
        <div className="max-w-xs rounded-md shadow-md bg-gray-50">
            <img src={`https://source.unsplash.com/300x300/?${title}?1`} alt="" className="object-cover object-center w-full rounded-t-md h-72 bg-gray-500" />
            <div className="flex flex-col justify-between p-6 space-y-8">
                <div className="space-y-2">
                    <h2 className="text-3xl font-semibold tracking-wide">{title}</h2>
                    <p className="">{description}</p>
                </div>
                {session.isLoggedIn ?
                    <Link href={`/explore/${id}`} type="button" className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md text-white bg-slate-900">Read more</Link>
                    :
                    <Link href='/login' type="button" className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md text-white bg-slate-900">Login to borrow</Link>

                }
            </div>
        </div>
    )
}

export default BookCard