import React, { useState } from 'react'

const ApproveBorrow = () => {
    const [error, setError] = useState('');
    return (
        <div className='divide-y divide-gray-200 md:max-w-96'>
            <form onSubmit="" className="py-2 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                    <input autoComplete="off" id="lib_id" name="lib_id" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="LIB ID" required />
                    <label htmlFor="lib_id" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">LIB ID</label>
                </div>
                <div className="relative">
                    <input autoComplete="off" id="user_id" name="user_id" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="USER ID" required />
                    <label htmlFor="user_id" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">USER ID</label>
                </div>
                <div className="relative">
                    <input autoComplete="off" id="book_id" name="book_id" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="BOOK ID" required />
                    <label htmlFor="book_id" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">BOOK ID</label>
                </div>
                <div className="relative">
                    <button type="submit" className="w-full bg-gray-800 border-2 border-gray-800 hover:bg-white hover:text-gray-800 text-white rounded-md px-2 py-1 transition duration-300">Approve Borrow</button>
                </div>
                {error !== '' && <p className="text-red-600">{error}</p>}
            </form>
        </div>
    )
}

export default ApproveBorrow