"use client";
import Image from "next/image";
import Link from "next/link";
import CollegeLibraryLogo from "@/assets/images/library_logo.png";
import { useState } from "react";
import { auth, signOut } from "../../auth";

const Navbar = () => {

    // const session = auth();
    const isLoggedIn = false; //session.status === "authenticated";

    const [isMenu, setIsMenu] = useState(false);
    const toggleMenu = () => {
        setIsMenu(!isMenu);
    }

    return (
        <nav className="bg-slate-200 text-gray-700">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between">

                    <div className="flex space-x-4">
                        <div>
                            <a href="/" className="flex items-center py-5 px-2 hover:text-gray-900">
                                <Image src={CollegeLibraryLogo} alt="library logo" className="w-14 h-14" />
                                <span className="font-bold">College Library</span>
                            </a>
                        </div>

                        <div className="hidden md:flex items-center space-x-1">
                            <a href="/books" className="py-5 px-3  hover:text-orange-800">Explore</a>
                            <a href="#" className="py-5 px-3 hover:text-orange-800">About</a>
                        </div>
                    </div>

                    {isLoggedIn && <div className="hidden md:flex items-center space-x-8">
                        <Link href="/books/borrowed" className="hover:text-orange-800">My Books</Link>
                        <Link href="/dashboard" className="hover:text-orange-800">My Space</Link>
                        <button onClick={() => signOut()} className="text-orange-800">Sign out</button>
                    </div>}

                    {!isLoggedIn && <div className="hidden md:flex items-center space-x-1">
                        <Link href="/login" className="py-5 px-3">Login</Link>
                        <Link href="/register" className="py-2 px-3 text-white bg-gray-800 hover:bg-white hover:text-gray-800 border-2 border-gray-800 rounded-md transition duration-300">
                            Signup</Link>
                    </div>}

                    <div className="md:hidden flex items-center">
                        <button className="mobile-menu-button" onClick={() => { toggleMenu() }}>
                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>

                </div>
            </div>

            <div className={` ${isMenu ? "" : "hidden"} md:hidden bg-slate-200`}>
                {!isLoggedIn && <div>
                    <Link href="/login" className="block py-2 px-4 text-sm hover:text-white hover:bg-orange-800">Login</Link>
                    <Link href="/register" className="block py-2 px-4 text-sm text-white bg-gray-800 hover:bg-orange-800  duration-300">
                        Signup</Link>
                </div>}

                <a href="#" className="block py-2 px-4 text-sm hover:text-white hover:bg-orange-800">Explore</a>
                <a href="#" className="block py-2 px-4 text-sm hover:text-white hover:bg-orange-800">About</a>
                {isLoggedIn && <div>
                    <hr className="border-b-2 border-gray-400 opacity-30 my-2" />
                    <Link href="/books/borrowed" className="block py-2 px-4 text-sm hover:text-white hover:bg-orange-800">My Books</Link>
                    <Link href="/dashboard" className="block py-2 px-4 text-sm hover:text-white hover:bg-orange-800">My Space</Link>
                    <button onClick={() => signOut()} className="block w-full text-left py-2 px-4 hover:text-white hover:bg-gray-800">Sign out</button>
                </div>}

            </div>
        </nav>
    );
};

export default Navbar;
