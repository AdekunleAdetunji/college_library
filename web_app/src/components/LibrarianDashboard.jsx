'use client'

import React, { useState } from 'react'
import ApproveBorrow from './ApproveBorrow';
import AddBook from './AddBook';

const LibrarianDashboard = () => {
    const [tab, setTab] = useState('approve');
    const [showAddBook, setShowAddBook] = useState(false);

    const handleShowAddBook = (val) => {
        setShowAddBook(val);
    }

    const handleTabDrop = (e) => {
        setTab(e.target.value);
    }

    const handleChangeTab = (t) => {
        setTab(t);
    }
    return (
        <div className='mt-4'>
            <div className='w-full flex justify-end'>
                <button onClick={() => handleShowAddBook(true)} className='bg-green-700 text-white mb-3 rounded-lg py-1 px-4 md:px-8 right-0 border-2 border-green-700 hover:bg-white hover:text-green-700'>
                    Add Book
                </button>
            </div>
            <div className="md:hidden">
                <label htmlFor="Tab" className="sr-only">Tab</label>

                <select id="Tab" defaultValue="Approve Borrow" onChange={handleTabDrop} className="border-2 p-2 rounded-md border-gray-200">
                    <option value='approve'>Approve Borrow</option>
                    <option value='check-in'>Check-in</option>
                    <option value='reserves'>Reserves</option>
                    <option value='user-reserves'>User Reserves</option>
                    <option value='user-blacklists'>User Blacklists</option>
                </select>
            </div>

            <div className="hidden md:block mb-4">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex gap-6" aria-label="Tabs">
                        <button
                            onClick={() => { handleChangeTab('approve') }}
                            className={`inline-flex shrink-0 items-center gap-2 border-b-2 px-1 pb-4 text-sm font-medium ${tab === 'approve' ? 'border-sky-500  text-sky-600' : 'text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill='none'
                                stroke='currentColor'
                                viewBox="0 0 1800 1800">
                                <g>
                                    <path fill="currentColor" d="M1506.693,279.092h-150.36v-85.277c0-17.353-14.065-31.418-31.419-31.418h-227.317 C1078.205,70.574,996.5,2.304,900.003,2.304c-96.499,0-178.202,68.27-197.595,160.092H475.091 c-17.353,0-31.419,14.065-31.419,31.418v85.277H293.307c-17.353,0-31.419,14.066-31.419,31.419v1455.764 c0,17.353,14.066,31.419,31.419,31.419h1213.386c17.354,0,31.42-14.066,31.42-31.419V310.511
		                                C1538.113,293.158,1524.047,279.092,1506.693,279.092z M506.511,225.234h223.28c16.617,0,30.354-12.935,31.362-29.517 c4.436-73.219,65.424-130.574,138.85-130.574c73.425,0,134.413,57.355,138.849,130.574c1.009,16.582,14.746,29.517,31.363,29.517 h223.28v53.858v62.838v74.81H506.511v-74.81v-62.838V225.234z M1475.274,1734.855H324.728V341.93h118.944v106.229 c0,17.354,14.066,31.419,31.419,31.419h849.823c17.354,0,31.419-14.066,31.419-31.419V341.93h118.941V1734.855z"/>
                                    <path fill="currentColor" d="M663.633,684.019L534.366,813.291l-57.803-57.806c-12.272-12.265-32.164-12.265-44.437,0
		                                c-12.269,12.272-12.269,32.164,0,44.437l80.021,80.022c6.136,6.132,14.176,9.201,22.219,9.201c8.043,0,16.083-3.069,22.219-9.201 l151.486-151.486c12.269-12.273,12.269-32.165,0-44.438C695.799,671.755,675.907,671.755,663.633,684.019z"/>
                                    <path fill="currentColor" d="M824.996,750.563c-17.354,0-31.419,14.066-31.419,31.419c0,17.354,14.066,31.419,31.419,31.419h520.665 c17.354,0,31.419-14.066,31.419-31.419c0-17.353-14.065-31.419-31.419-31.419H824.996z" />
                                    <path fill="currentColor" d="M663.633,1039.925l-129.267,129.272l-57.803-57.807c-12.272-12.265-32.164-12.265-44.437,0 c-12.269,12.272-12.269,32.164,0,44.438l80.021,80.021c6.136,6.133,14.176,9.2,22.219,9.2c8.043,0,16.083-3.067,22.219-9.2 l151.486-151.486c12.269-12.272,12.269-32.163,0-44.438C695.799,1027.66,675.907,1027.66,663.633,1039.925z" />
                                    <path fill="currentColor" d="M1345.661,1106.467H824.996c-17.354,0-31.419,14.066-31.419,31.42s14.066,31.42,31.419,31.42h520.665 c17.354,0,31.419-14.066,31.419-31.42S1363.015,1106.467,1345.661,1106.467z" />
                                    <path fill="currentColor" d="M663.633,1395.83l-129.267,129.272l-57.803-57.808c-12.272-12.264-32.164-12.264-44.437,0 c-12.269,12.274-12.269,32.166,0,44.439l80.021,80.021c6.136,6.132,14.176,9.199,22.219,9.199c8.043,0,16.083-3.067,22.219-9.199 l151.486-151.486c12.269-12.274,12.269-32.166,0-44.438C695.799,1383.566,675.907,1383.566,663.633,1395.83z" />
                                    <path fill="currentColor" d="M1345.661,1462.373H824.996c-17.354,0-31.419,14.066-31.419,31.42s14.066,31.418,31.419,31.418h520.665 c17.354,0,31.419-14.064,31.419-31.418S1363.015,1462.373,1345.661,1462.373z" />
                                </g>
                            </svg>
                            Approve Borrow
                        </button>

                        <button
                            onClick={() => { handleChangeTab('check-in') }}
                            className={`inline-flex shrink-0 items-center gap-2 border-b-2 px-1 pb-4 text-sm font-medium ${tab === 'check-in' ? 'border-sky-500  text-sky-600' : 'text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}
                        >
                            <svg fill="none"
                                className="h-5 w-5"
                                stroke='currentColor' viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z" />
                                <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
                            </svg>
                            Check-in
                        </button>

                        <button
                            onClick={() => { handleChangeTab('reserves') }}
                            className={`inline-flex shrink-0 items-center gap-2 border-b-2 px-1 pb-4 text-sm font-medium ${tab === 'reserves' ? 'border-sky-500  text-sky-600' : 'text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}
                        >
                            <svg
                                fill="#none"
                                className="h-5 w-5"
                                stroke='currentColor'
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 455.978 455.978">
                                <g>
                                    <path fill='currentColor' d="M335.954,169.698V58.679H144.918v111.02H335.954z M159.918,73.679h161.036v81.02H159.918V73.679z" />
                                    <rect fill='currentColor' x="175.939" y="89.519" width="128.993" height="15" />
                                    <rect fill='currentColor' x="175.939" y="119.517" width="128.993" height="15" />
                                    <path fill='currentColor' d="M391.076,0H104.224C82.542,0,64.902,17.64,64.902,39.323c0,0,0.003,332.512,0.003,332.514 c0,21.68,17.638,39.318,39.318,39.318h22.913v44.823h55.897v-44.823h208.037L391.076,0z M376.076,332.506H111.724V15h264.352 V332.506z M96.724,16.189v317.032c-6.142,1.18-11.883,3.811-16.822,7.715V39.323C79.902,28.528,86.973,19.358,96.724,16.189z M104.223,396.155c-13.409,0-24.318-10.909-24.318-24.318c0-6.505,2.529-12.617,7.122-17.209 c4.592-4.592,10.699-7.121,17.196-7.121h22.913v48.648H104.223z M142.136,440.978v-93.472h25.897v93.472H142.136z M376.071,396.155 H183.034v-48.648h193.037V396.155z" />
                                </g>
                            </svg>

                            Reserves
                        </button>

                        <button
                            onClick={() => { handleChangeTab('user-reserves') }}
                            className={`inline-flex shrink-0 items-center gap-2 border-b-2 px-1 pb-4 text-sm font-medium ${tab === 'user-reserves' ? 'border-sky-500  text-sky-600' : 'text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}
                        >
                            <svg
                                fill="#none"
                                className="h-5 w-5"
                                stroke='currentColor'
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 509.117 509.117">
                                <g transform="translate(1 1)">
                                    <g>
                                        <g>
                                            <path fill='currentColor' d="M500.965,256.162c-13.017-16.488-39.919-11.281-54.671-1.736l-75.498,50.332H255.378 c-1.736-1.736-2.603-5.207-2.603-7.81c0-3.471,1.736-7.81,4.339-10.414l51.2-17.356c15.62-6.942,28.637-28.637,21.695-45.993 c-2.603-6.075-7.81-11.281-14.753-13.885c-9.546-3.471-21.695-3.471-31.241,0.868l-77.234,26.034l-93.722,8.678 c-6.942,0-18.224,6.942-22.563,9.546l-59.878,25.166c-26.902,12.149-39.051,43.39-26.902,70.292l39.919,97.193 c0.868,2.603,2.603,4.339,5.207,5.207c1.736,0.868,2.603,0.868,3.471,0.868c1.736,0,2.603,0,3.471-0.868l102.4-51.2h154.468 c0.868,0,1.736,0,2.603-1.736l104.136-34.712c0.868,0,1.736,0,2.603-0.868l69.424-52.068 c8.678-6.075,14.753-17.356,16.488-28.637C508.775,272.65,507.039,263.104,500.965,256.162z M490.551,281.328 c-0.868,6.942-4.339,13.885-9.546,17.356l-68.556,51.2l-101.532,33.844H156.449c-1.736,0-2.603,0-4.339,0l-95.458,47.729 l-36.447-88.515c-7.81-18.224,0-39.051,18.224-47.729l60.746-26.034c0.868,0,0.868,0,1.736-0.868 c3.471-2.603,10.414-6.942,13.017-6.942l95.458-8.678c0.868,0,0.868,0,1.736,0l78.969-26.034 c3.471-0.868,6.942-1.736,10.414-1.736c2.603,0,5.207,0,7.81,0.868c2.603,0.868,4.339,2.603,5.207,4.339 c2.603,6.942-4.339,19.959-12.149,23.431l-52.068,17.356c-0.868,0.868-1.736,0.868-2.603,1.736 c-7.81,6.075-12.149,15.62-12.149,26.034c0.868,9.546,5.207,17.356,13.017,22.563c0.868,0.868,2.603,1.736,4.339,1.736h121.492 c1.736,0,3.471-0.868,3.471-1.736l78.102-52.068c9.546-6.075,26.902-8.678,32.108-1.736 C490.551,270.914,491.419,276.121,490.551,281.328z" />
                                            <path fill='currentColor' d="M60.992,175.457h52.068h34.712h225.627h34.712h52.068c5.207,0,8.678-3.471,8.678-8.678V62.643 c0-5.207-3.471-8.678-8.678-8.678H408.11h-34.712H147.772H113.06H60.992c-5.207,0-8.678,3.471-8.678,8.678v104.136 C52.314,171.985,55.785,175.457,60.992,175.457z M156.449,158.101v-86.78h208.271v86.78H156.449z M451.5,158.101h-34.712v-86.78 H451.5V158.101z M399.433,71.321v86.78h-17.356v-86.78H399.433z M139.094,71.321v86.78h-17.356v-86.78H139.094z M69.67,71.321 h34.712v86.78H69.67V71.321z" />
                                            <path fill='currentColor' d="M321.331,106.033H199.839c-5.207,0-8.678,3.471-8.678,8.678s3.471,8.678,8.678,8.678h121.492 c5.207,0,8.678-3.471,8.678-8.678S326.538,106.033,321.331,106.033z" />
                                        </g>
                                    </g>
                                </g>
                            </svg>
                            User Reserves
                        </button>

                        <button
                            onClick={() => { handleChangeTab('user-blacklists') }}
                            className={`inline-flex shrink-0 items-center gap-2 px-1 pb-4 text-sm font-medium border-b-2 ${tab === 'user-blacklists' ? 'border-sky-500  text-sky-600' : 'text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}
                        >
                            <svg
                                fill="#none"
                                className="h-5 w-5"
                                stroke='currentColor'
                                xmlns="http://www.w3.org/2000/svg"

                                viewBox="0 0 28.331 28.331"
                            >
                                <g>
                                    <path fill='currentColor' d="M25.098,0.586h-0.734v2.02c0,0.67-0.545,1.212-1.213,1.212s-1.211-0.542-1.211-1.212v-2.02H19.87v2.02
		c0,0.67-0.544,1.212-1.212,1.212c-0.669,0-1.211-0.542-1.211-1.212v-2.02h-2.07v2.02c0,0.67-0.543,1.212-1.212,1.212
		s-1.212-0.542-1.212-1.212v-2.02h-2.07v2.02c0,0.67-0.542,1.212-1.211,1.212c-0.668,0-1.212-0.542-1.212-1.212v-2.02H6.39v2.02
		c0,0.67-0.542,1.212-1.211,1.212c-0.668,0-1.212-0.542-1.212-1.212v-2.02H3.232C1.449,0.586,0,2.036,0,3.82v20.691
		c0,1.784,1.449,3.234,3.232,3.234H25.1c1.782,0,3.231-1.45,3.231-3.234V3.82C28.33,2.036,26.881,0.586,25.098,0.586z M8.06,19.666
		c-0.828,0-1.5-0.672-1.5-1.5s0.672-1.5,1.5-1.5s1.5,0.672,1.5,1.5S8.888,19.666,8.06,19.666z M8.06,15.666
		c-0.828,0-1.5-0.672-1.5-1.5s0.672-1.5,1.5-1.5s1.5,0.672,1.5,1.5S8.888,15.666,8.06,15.666z M8.06,11.666
		c-0.828,0-1.5-0.672-1.5-1.5s0.672-1.5,1.5-1.5s1.5,0.672,1.5,1.5S8.888,11.666,8.06,11.666z M20.768,19.166H12.56
		c-0.552,0-1-0.447-1-1s0.448-1,1-1h8.208c0.553,0,1,0.447,1,1S21.32,19.166,20.768,19.166z M20.768,15.166H12.56
		c-0.552,0-1-0.447-1-1s0.448-1,1-1h8.208c0.553,0,1,0.447,1,1S21.32,15.166,20.768,15.166z M20.768,11.166H12.56
		c-0.552,0-1-0.447-1-1s0.448-1,1-1h8.208c0.553,0,1,0.447,1,1S21.32,11.166,20.768,11.166z"/>
                                </g>
                            </svg>
                            User Blacklists
                        </button>
                    </nav>
                </div>
            </div>
            {tab === 'approve' && <ApproveBorrow />}
            {tab === 'check-in' && <div>
                checkin!
            </div>}
            {tab === 'reserves' && <div>
                reserves!
            </div>}
            {tab === 'user-reserves' && <div>
                user reserves!
            </div>}
            {tab === 'user-blacklists' && <div>
                user blacklists!
            </div>}

            {/* add book */}
            <AddBook showModal={showAddBook} handleModal={handleShowAddBook} />
        </div>
    )
}

export default LibrarianDashboard