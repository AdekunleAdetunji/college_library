'use client'
import { makeReservation } from '@/lib/actions';
import React, { useState } from 'react'
import { Toaster, toast } from 'sonner';

const BorrowButton = ({ book_id }) => {
    const [borrowed, setBorrowed] = useState(false);

    const borrowNow = async (e) => {
        e.preventDefault();
        const response = await makeReservation(book_id);
        if (response.isSuccess) {
            toast.success("Book has been successfully reserved!");
            setBorrowed(true);
        } else {
            toast.error(response.message);
        }
    }
    return (
        <div className="inline-block align-bottom">
            {borrowed ?
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-10 h-10 fill-current text-green-600">
                    <path d="M426.072,86.928A238.75,238.75,0,0,0,88.428,424.572,238.75,238.75,0,0,0,426.072,86.928ZM257.25,462.5c-114,0-206.75-92.748-206.75-206.75S143.248,49,257.25,49,464,141.748,464,255.75,371.252,462.5,257.25,462.5Z"></path>
                    <polygon points="221.27 305.808 147.857 232.396 125.23 255.023 221.27 351.063 388.77 183.564 366.142 160.937 221.27 305.808"></polygon>
                </svg>
                :
                <form onSubmit={borrowNow}>
                    <button type='submit' className="bg-yellow-500 opacity-75 hover:opacity-100 text-orange-900 hover:text-gray-900 rounded-full px-10 py-2 font-semibold">
                        Borrow Now!
                    </button>
                </form>
            }
            <Toaster richColors />
        </div>
    )
}

export default BorrowButton