import AddFaculty from '@/components/AddFaculty';
import { getFaculties, getSession } from '@/lib/actions'
import { redirect } from 'next/navigation';
import React from 'react'

const Admin = async () => {
    const session = await getSession();
    if (!session.isLoggedIn || session.user.userType !== 'admin') {
        redirect('/');
    }


    const response = await getFaculties();
    let faculties = [];
    if (response.isSuccess) {
        faculties = response.data
    }

    return (
        <div className='flex flex-col w-full p-4'>
            <div>
                <h2 className='text-2xl md:text-4xl'>Admin Dashboard</h2>
            </div>
            <AddFaculty />
            <section className="py-1 bg-blueGray-50 w-full">
                <div className="w-full xl:w-1/2 px-4 mx-auto mt-24">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white ">
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                    <h3 className="font-semibold text-base text-blueGray-700">
                                        Faculties
                                    </h3>
                                </div>
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                                    <button className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                                        Add
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="block w-full overflow-x-auto">
                            <table className="items-center w-full border-collapse text-blueGray-700  ">
                                <thead className="thead-light ">
                                    <tr>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Name
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            uni_id
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-700 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {faculties.map((element) => {
                                        return <tr key={element.uni_id}>
                                            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                                {element.name}
                                            </th>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                {element.uni_id}
                                            </td>
                                            {/* <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            <div className="flex items-center">
                                                <span className="mr-2">{element.email}</span>
                                                
                                            </div>
                                        </td> */}
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Admin