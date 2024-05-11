import BookCard from '@/components/BookCard';
import { getBooks } from '@/lib/actions';
import React from 'react'

const Explore = async () => {
    const response = await getBooks();

    return (
        <div className='w-full min-h-screen flex flex-col items-center bg-slate-300 py-6'>
            <h2 className='text-2xl md:text-4xl mb-8'>Library books</h2>
            {response.isSuccess ?
                <div className='flex justify-center flex-wrap gap-6'>
                    {response.data.map((element) => {
                        return <BookCard key={element.id} id={element.uni_id} title={element.title} description={element.description} />
                    })}
                </div>
                :
                <div>
                    <p>Something went wrong, could not fetch the books!</p>
                </div>
            }
            <div className='flex flex-wrap'>

            </div>
        </div>
    )
}

export default Explore