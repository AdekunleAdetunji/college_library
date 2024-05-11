import { bookDetails } from '@/lib/actions';
import Image from 'next/image';
import React from 'react'

const page = async ({ params }) => {
    const id = params.id;
    const book = await bookDetails(id);

    return (
        <div className="min-w-screen min-h-screen bg-white flex items-center p-5 lg:p-10 overflow-hidden relative">
            {book.isSuccess ?
                <div className="w-full max-w-6xl rounded bg-white shadow-xl p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left">
                    <div className="md:flex items-center -mx-10">
                        <div className="w-full md:w-1/2 px-10 mb-10 md:mb-0">
                            <div className="relative">
                                <img src={`https://source.unsplash.com/300x300/?${book.data.title}?1`} className="w-full relative z-10" alt="" />
                                <div className="border-4 border-yellow-200 absolute top-10 bottom-10 left-10 right-10 z-0"></div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 px-10">
                            <div className="mb-10">
                                <h1 className="font-bold uppercase text-2xl mb-5">{book.data.title}</h1>
                                <p className='text-sm font-bold'>Autors:</p>
                                {book.data.authors.map((author) => {
                                    return <p key={author.id} className='text-sm pl-2'>- {[author.firstname, author.middlename, author.lastname].join(' ')}</p>
                                })}
                                <p className='text-sm font-bold mt-2'>Description:</p>
                                <p className="text-sm ">{book.data.description}</p>
                            </div>
                            <div>
                                <div className="inline-block align-bottom mr-5">
                                    <span className="text-lg leading-none align-baseline">Quantity: </span>
                                    <span className="font-bold text-xl leading-none align-baseline">{book.data.quantity}</span>
                                </div>
                                <div className="inline-block align-bottom">
                                    <button className="bg-yellow-500 opacity-75 hover:opacity-100 text-orange-900 hover:text-gray-900 rounded-full px-10 py-2 font-semibold">Borrow Now!</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <p>Something went wrong!</p>
            }
        </div>
    )
}

export default page