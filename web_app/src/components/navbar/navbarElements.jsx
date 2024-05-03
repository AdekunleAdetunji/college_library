"use client";
import Image from "next/image";
import Link from "next/link";
import CollegeLibraryLogo from "@/assets/images/library_logo.png";
import { useEffect, useState } from "react";
import { LogOut } from "@/lib/actions";
import { redirect, useRouter } from "next/navigation";

const NavbarElements = ({ session }) => {

    useEffect(() => {
        const now = Date.now();
        if (session && session.user) {
            if (now - session.createdAt > 24 * 60 * 60 * 1000) {
                LogOut();
                redirect('/login');
            }
        }
    }, [])
    const isLoggedIn = session.isLoggedIn;

    const [isMenu, setIsMenu] = useState(false);
    const toggleMenu = () => {
        setIsMenu(!isMenu);
    }


    const handleLogout = async () => {
        await LogOut();
        window.location.reload();
    }

    return (
        <nav className="bg-slate-200 text-gray-700 relative">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between">

                    <div className="flex space-x-4">
                        <div>
                            <Link href="/" className="flex items-center py-5 px-2 hover:text-gray-900">
                                <Image src={CollegeLibraryLogo} alt="library logo" className="w-14 h-14" />
                                <span className="font-bold">College Library</span>
                            </Link>
                        </div>

                        <div className="hidden md:flex items-center space-x-1">
                            <Link href="/explore" className="py-5 px-3  hover:text-orange-800">Explore</Link>
                            <Link href="/about" className="py-5 px-3 hover:text-orange-800">About</Link>
                        </div>
                    </div>

                    {isLoggedIn && <div className="hidden md:flex items-center space-x-8">
                        {session.user.userType === 'user' && <>
                            <Link href="/books/borrowed" className="hover:text-orange-800">My Books</Link>
                            <Link href="/profile" className="hover:text-orange-800">Profile</Link>
                        </>
                        }
                        {session.user.userType === 'admin' &&
                            <Link href="/admin" className="hover:text-orange-800">Dashboard</Link>}
                        {session.user.userType === 'librarian' &&
                            <Link href="/lib-dashboard" className="hover:text-orange-800">Dashboard</Link>}
                        <button onClick={() => { handleLogout() }} className="text-orange-800">Sign out</button>
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

            <div className={`absolute w-full transition-transform duration-300 ${isMenu ? "translate-y-0 z-10" : "opacity-50 -translate-y-full -z-10"} md:hidden bg-slate-200`}>
                {!isLoggedIn && <div>
                    <Link href="/login" onClick={() => { toggleMenu() }} className="block py-2 px-4 text-sm hover:text-white hover:bg-orange-800">Login</Link>
                    <Link href="/register" onClick={() => { toggleMenu() }} className="block py-2 px-4 text-sm text-white bg-gray-800 hover:bg-orange-800  duration-300">
                        Signup</Link>
                </div>}

                <Link href="/explore" onClick={() => { toggleMenu() }} className="block py-2 px-4 text-sm hover:text-white hover:bg-orange-800">Explore</Link>
                <Link href="/about" onClick={() => { toggleMenu() }} className="block py-2 px-4 text-sm hover:text-white hover:bg-orange-800">About</Link>
                {isLoggedIn && <div>
                    <hr className="border-b-2 border-gray-400 opacity-30 my-2" />
                    {session.user.userType !== 'admin' && <>
                        <Link href="/books/borrowed" onClick={() => { toggleMenu() }} className="block py-2 px-4 text-sm hover:text-white hover:bg-orange-800">My Books</Link>
                        <Link href="/profile" onClick={() => { toggleMenu() }} className="block py-2 px-4 text-sm hover:text-white hover:bg-orange-800">Profile</Link>
                    </>
                    }
                    {session.user.userType === 'admin' &&
                        <Link href="/admin" onClick={() => { toggleMenu() }} className="block py-2 px-4 text-sm hover:text-white hover:bg-orange-800">Dashboard</Link>}
                    {session.user.userType === 'librarian' &&
                        <Link href="/lib-dashboard" onClick={() => { toggleMenu() }} className="block py-2 px-4 text-sm hover:text-white hover:bg-orange-800">Dashboard</Link>}
                    <button onClick={() => { handleLogout(); setIsMenu(false); }} className="block w-full text-left py-2 px-4 hover:text-white hover:bg-gray-800">Sign out</button>
                </div>}
            </div>
        </nav>
    );
};

export default NavbarElements;
