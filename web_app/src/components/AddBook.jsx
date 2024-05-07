'use client'

import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddBook = ({ showModal, handleModal }) => {
    const [startDate, setStartDate] = useState(new Date());
    const handleSubmit = ({ }) => {

    }

    return (
        <div className={`${showModal ? '' : 'hidden'} w-full h-full fixed top-0 left-0 bg-black bg-opacity-80 flex items-center justify-center z-10 overflow-auto`}>
            <div className='absolute w-full top-0 left-0 py-6 flex items-center justify-center overflow-auto'>
                <div className="flex flex-col w-full md:w-1/2 md:max-w-96 justify-center py-6 z-10 items-center bg-white rounded-lg">
                    <form onSubmit={handleSubmit} className="py-2 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">

                        <h1 className="text-gray-800 font-bold text-2xl mb-8">Add a book</h1>

                        <div className="relative">
                            <input autoComplete="off" id="uni_id" name="username" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600" placeholder="UNI ID" required />
                            <label htmlFor="uni_id" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">UNI ID</label>
                        </div>
                        <div className="relative">
                            <input autoComplete="off" id="title" name="title" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600" placeholder="Title" required />
                            <label htmlFor="title" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Title</label>
                        </div>
                        <div className="relative">
                            <textarea autoComplete="off" id="description" name="description" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600" placeholder="description" required />
                            <label htmlFor="description" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">description</label>
                        </div>
                        <div className="relative">
                            <textarea
                                autoComplete="off" id="faculties" name="faculties"
                                className="peer placeholder-transparent h-24 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600" placeholder="Enter faculties (one per line)" required
                            ></textarea>
                            <label htmlFor="faculties" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Faculties</label>
                            <p className='block text-sm text-red-600'>Enter faculties one per line.</p>
                        </div>
                        <hr />
                        <p className='text-sm'>Publisher's info:</p>
                        <div className="relative">
                            <input autoComplete="off" id="publisher" name="publisher" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600" placeholder="Publisher" required />
                            <label htmlFor="publisher" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Publisher</label>
                        </div>
                        <div className="relative">
                            <DatePicker id="publisher_year" selected={startDate} onChange=
                                {(date) => setStartDate(date)} />
                            <label htmlFor="publisher_year" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Publisher Year</label>
                        </div>
                        <hr />
                        <p className='text-sm'>Author's info:</p>
                        <div className="relative">
                            <input autoComplete="off" id="firstname" name="firstname" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600" placeholder="First Name" required />
                            <label htmlFor="firstname" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">First Name</label>
                        </div>
                        <div className="relative">
                            <input autoComplete="off" id="lastname" name="lastname" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600" placeholder="Last Name" required />
                            <label htmlFor="lastname" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Last Name</label>
                        </div>
                        <div className="relative">
                            <input autoComplete="off" id="middlename" name="middlename" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600" placeholder="Middle Name" required />
                            <label htmlFor="middlename" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Middle Name</label>
                        </div>
                        <div className="relative">
                            <input autoComplete="off" id="email" name="email" type="email" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600" placeholder="Email" required />
                            <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email</label>
                        </div>
                        <div className="relative flex justify-center gap-3">
                            <button type="submit" className="bg-gray-800 border-2 border-gray-800 hover:bg-white hover:text-gray-800 text-white rounded-md px-2 py-1 transition duration-300">Submit</button>
                            <button type="button" onClick={() => { handleModal(false) }} className="bg-white-800 text-gray-900 border-2 border-gray-800 hover:bg-gray-400 hover:text-gray-800 rounded-md px-2 py-1 transition duration-300">Cancel</button>
                        </div>
                    </form>
                    {/* {error !== '' && <p className='text-red-500'>{error}</p>} */}
                </div>
            </div>
        </div>
    )
}

export default AddBook