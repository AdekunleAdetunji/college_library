'use client'

import React from 'react'

const AddFaculty = () => {
    return (
        <div className='w-full flex justify-center gap-3 relative'>
            <button className='bg-green-400 w-1/6 p-2 rounded-lg'>Add Faculty</button>
            <button className='bg-blue-400 w-1/6 p-2 rounded-lg'>Add Librarian</button>

            <div className='w-full h-full fixed top-0 flex items-center justify-center z-10'>
                <div className='w-full h-full absolute bg-black opacity-80 top-0'></div>
                <div className="flex flex-col w-full md:w-1/2 md:max-w-96 justify-center py-10 z-10 items-center bg-white rounded-lg">
                    <form onSubmit='' className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">

                        <h1 className="text-gray-800 font-bold text-2xl mb-8">Add a librarian</h1>

                        <div className="relative">
                            <input autoComplete="off" id="uni_id" name="username" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="UNI ID" required />
                            <label htmlFor="uni_id" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">UNI ID</label>
                        </div>
                        <div className="relative">
                            <input autoComplete="off" id="password" name="password" type="password" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" required />
                            <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                        </div>
                        <div className="relative flex justify-center gap-3">
                            <button type="submit" className="bg-gray-800 border-2 border-gray-800 hover:bg-white hover:text-gray-800 text-white rounded-md px-2 py-1 transition duration-300">Submit</button>
                            <button type="button" className="bg-white-800 text-gray-900 border-2 border-gray-800 hover:bg-gray-400 hover:text-gray-800 rounded-md px-2 py-1 transition duration-300">Cancel</button>
                        </div>
                    </form>
                    {/* {error !== '' && <p className='text-red-500'>{error}</p>} */}
                </div>
            </div>

        </div>
    )
}

export default AddFaculty