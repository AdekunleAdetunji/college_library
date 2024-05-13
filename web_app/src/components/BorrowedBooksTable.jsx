import { booksReservedByUser } from '@/lib/actions';
import React from 'react'

const BorrowedBooksTable = async () => {

    const response = await booksReservedByUser();
    return (
        <div className="container p-2 mx-auto sm:p-4">
            <div className="overflow-x-auto">
                <table className="min-w-full text-xs">
                    <colgroup>
                        <col />
                        <col />
                        <col />
                        <col />
                        <col className="w-24" />
                    </colgroup>
                    <thead className="dark:bg-gray-300">
                        <tr className="text-left">
                            <th className="p-3">Book ID</th>
                            <th className="p-3">Title</th>
                            <th className="p-3">Author</th>
                            <th className="p-3">Due</th>
                            <th className="p-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
                            <td className="p-3">
                                <p>bk1</p>
                            </td>
                            <td className="p-3">
                                <p>book book</p>
                            </td>
                            <td className="p-3">
                                <p>john doe</p>
                            </td>
                            <td className="p-3">
                                <p>13 05 2024</p>
                            </td>
                            <td className="p-3 text-left">
                                <span className="px-3 py-1 font-semibold rounded-md">
                                    <span>Pending</span>
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default BorrowedBooksTable