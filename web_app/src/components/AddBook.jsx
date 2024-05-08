'use client'

import { addBook } from '@/lib/actions';
import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Toaster, toast } from 'sonner';

const AddBook = ({ showModal, handleModal }) => {
    const [uni_id, setUNIID] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [faculties, setFaculties] = useState('')
    const [publisher, setPublisher] = useState('')
    const [publish_year, setPublishYear] = useState(new Date());
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [middlename, setMiddlename] = useState('')
    const [email, setEmail] = useState('')
    const [quantity, setQuantity] = useState(0)
    const [authors, setAuthors] = useState([])

    const handleUNIIDChange = (e) => {
        setUNIID(e.target.value);
    }
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }
    const handleFacultiesChange = (e) => {
        setFaculties(e.target.value);
    }
    const handlePublisherChange = (e) => {
        setPublisher(e.target.value);
    }
    const handleFirstnameChange = (e) => {
        setFirstname(e.target.value);
    }
    const handleLastnameChange = (e) => {
        setLastname(e.target.value);
    }
    const handleMidnameChange = (e) => {
        setLastname(e.target.value);
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
    }

    const handleAddAuthor = () => {
        setAuthors((prev) => {
            return [
                ...prev,
                {
                    "firstname": firstname,
                    "lastname": lastname,
                    "middlename": middlename,
                    "email": email
                }
            ]
        });
        toast.success('Author added');
    }
    const handleDeleteAuthor = (index) => {
        setAuthors((prev) => {
            return [
                ...prev.slice(0, index),
                ...prev.slice(index + 1)
            ]
        });
        toast.error('Author deleted');
    }

    const resetValues = () => {
        setUNIID('');
        setTitle('');
        setDescription('');
        setFaculties('')
        setPublisher('')
        setFirstname('')
        setLastname('')
        setMiddlename('')
        setEmail('')
        setQuantity(0)
        setAuthors([])
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const fac = faculties.split("\n")
        const pbyear = publish_year.toISOString().slice(0, 10);
        const data = {
            "title": title,
            "description": description,
            "faculties": fac,
            "uni_id": uni_id,
            "publisher": publisher,
            "publish_year": pbyear,
            "authors": authors,
            "quantity": parseInt(quantity)
        }
        const response = await addBook(data);
        if (response.isSuccess) {
            toast.success('The book has been added successfully');
            resetValues();
        } else {
            toast.error(error.message)
        }
    }

    return (
        <div className={`${showModal ? '' : 'hidden'} w-full h-full fixed top-0 left-0 bg-black bg-opacity-80 flex items-center justify-center z-10 overflow-auto`}>
            <div className='absolute w-full top-0 left-0 py-6 flex items-center justify-center overflow-auto'>
                <div className="flex flex-col w-full md:w-1/2 md:max-w-96 justify-center py-6 z-10 items-center bg-white rounded-lg">
                    <form onSubmit={handleSubmit} className="py-2 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">

                        <h1 className="text-gray-800 font-bold text-2xl mb-8">Add a book</h1>

                        <div className="relative">
                            <input autoComplete="off" id="uni_id" name="uni_id" type="text" value={uni_id} onChange={handleUNIIDChange} className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600" placeholder="UNI ID" required />
                            <label htmlFor="uni_id" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">UNI ID</label>
                        </div>
                        <div className="relative">
                            <input autoComplete="off" id="title" name="title" type="text" value={title} onChange={handleTitleChange} className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600" placeholder="Title" required />
                            <label htmlFor="title" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Title</label>
                        </div>
                        <div className="relative">
                            <textarea autoComplete="off" id="description" name="description" type="text" value={description} onChange={handleDescriptionChange} className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600" placeholder="description" required />
                            <label htmlFor="description" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">description</label>
                        </div>
                        <div className="relative">
                            <textarea
                                autoComplete="off" id="faculties" name="faculties" value={faculties} onChange={handleFacultiesChange}
                                className="peer placeholder-transparent h-24 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600" placeholder="Enter faculties (one per line)" required
                            ></textarea>
                            <label htmlFor="faculties" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Faculties</label>
                            <p className='block text-sm text-red-600'>Enter faculties one per line.</p>
                        </div>
                        <div className="relative">
                            <input autoComplete="off" id="quantity" name="quantity" type="number" value={quantity} onChange={handleQuantityChange} className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600" placeholder="Quantity" required />
                            <label htmlFor="quantity" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Quantity</label>
                        </div>
                        <hr />
                        <p className='text-sm'>Publisher's info:</p>
                        <div className="relative">
                            <input autoComplete="off" id="publisher" name="publisher" type="text" value={publisher} onChange={handlePublisherChange} className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600" placeholder="Publisher" required />
                            <label htmlFor="publisher" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Publisher</label>
                        </div>
                        <div className="relative">
                            <DatePicker id="publisher_year" selected={publish_year} onChange={(date) => setPublishYear(date)} />
                            <label htmlFor="publisher_year" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Publisher Year</label>
                        </div>
                        <hr />
                        <p className='text-sm'>Authors info:</p>
                        <div className='flex flex-col gap-1'>
                            {authors.map((element, index) => {
                                return <div key={index} className='w-full p-1 flex items-center justify-between text-black rounded-r-md bg-gradient-to-l from-slate-50 to-slate-300'>
                                    <p className='text-sm'>{element.firstname} {element.lastname}</p>
                                    <svg onClick={() => { handleDeleteAuthor(index) }} className='w-5 h-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                                        <linearGradient id="wRKXFJsqHCxLE9yyOYHkza_fYgQxDaH069W_gr1" x1="9.858" x2="38.142" y1="9.858" y2="38.142" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#f44f5a"></stop><stop offset=".443" stopColor="#ee3d4a"></stop><stop offset="1" stopColor="#e52030"></stop></linearGradient><path fill="url(#wRKXFJsqHCxLE9yyOYHkza_fYgQxDaH069W_gr1)" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><path d="M33.192,28.95L28.243,24l4.95-4.95c0.781-0.781,0.781-2.047,0-2.828l-1.414-1.414	c-0.781-0.781-2.047-0.781-2.828,0L24,19.757l-4.95-4.95c-0.781-0.781-2.047-0.781-2.828,0l-1.414,1.414	c-0.781,0.781-0.781,2.047,0,2.828l4.95,4.95l-4.95,4.95c-0.781,0.781-0.781,2.047,0,2.828l1.414,1.414	c0.781,0.781,2.047,0.781,2.828,0l4.95-4.95l4.95,4.95c0.781,0.781,2.047,0.781,2.828,0l1.414-1.414	C33.973,30.997,33.973,29.731,33.192,28.95z" opacity=".05"></path><path d="M32.839,29.303L27.536,24l5.303-5.303c0.586-0.586,0.586-1.536,0-2.121l-1.414-1.414	c-0.586-0.586-1.536-0.586-2.121,0L24,20.464l-5.303-5.303c-0.586-0.586-1.536-0.586-2.121,0l-1.414,1.414	c-0.586,0.586-0.586,1.536,0,2.121L20.464,24l-5.303,5.303c-0.586,0.586-0.586,1.536,0,2.121l1.414,1.414	c0.586,0.586,1.536,0.586,2.121,0L24,27.536l5.303,5.303c0.586,0.586,1.536,0.586,2.121,0l1.414-1.414	C33.425,30.839,33.425,29.889,32.839,29.303z" opacity=".07"></path><path fill="#fff" d="M31.071,15.515l1.414,1.414c0.391,0.391,0.391,1.024,0,1.414L18.343,32.485	c-0.391,0.391-1.024,0.391-1.414,0l-1.414-1.414c-0.391-0.391-0.391-1.024,0-1.414l14.142-14.142	C30.047,15.124,30.681,15.124,31.071,15.515z"></path><path fill="#fff" d="M32.485,31.071l-1.414,1.414c-0.391,0.391-1.024,0.391-1.414,0L15.515,18.343	c-0.391-0.391-0.391-1.024,0-1.414l1.414-1.414c0.391-0.391,1.024-0.391,1.414,0l14.142,14.142	C32.876,30.047,32.876,30.681,32.485,31.071z"></path>
                                    </svg>
                                </div>
                            })}
                        </div>
                        <div className="relative">
                            <input autoComplete="off" id="firstname" name="firstname" type="text" value={firstname} onChange={handleFirstnameChange} className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600" placeholder="First Name" {...(authors.length > 0 ? {} : { required: true })} />
                            <label htmlFor="firstname" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">First Name</label>
                        </div>
                        <div className="relative">
                            <input autoComplete="off" id="lastname" name="lastname" type="text" value={lastname} onChange={handleLastnameChange} className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600" placeholder="Last Name" {...(authors.length > 0 ? {} : { required: true })} />
                            <label htmlFor="lastname" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Last Name</label>
                        </div>
                        <div className="relative">
                            <input autoComplete="off" id="middlename" name="middlename" type="text" value={middlename} onChange={handleMidnameChange} className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600" placeholder="Middle Name" />
                            <label htmlFor="middlename" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Middle Name</label>
                        </div>
                        <div className="relative">
                            <input autoComplete="off" id="email" name="email" type="email" value={email} onChange={handleEmailChange} className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600" placeholder="Email" />
                            <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email</label>
                        </div>
                        <button type='button' onClick={() => { handleAddAuthor() }} className="w-full bg-blue-600 text-white rounded-sm">Add Author</button>

                        <div className="relative flex justify-center gap-3 pt-2">
                            <button type="submit" className="bg-gray-800 border-2 border-gray-800 hover:bg-white hover:text-gray-800 text-white rounded-md px-2 py-1 transition duration-300">Submit</button>
                            <button type="button" onClick={() => { handleModal(false) }} className="bg-white-800 text-gray-900 border-2 border-gray-800 hover:bg-gray-400 hover:text-gray-800 rounded-md px-2 py-1 transition duration-300">Cancel</button>
                        </div>
                    </form>
                    <Toaster richColors />
                </div>
            </div>
        </div>
    )
}

export default AddBook