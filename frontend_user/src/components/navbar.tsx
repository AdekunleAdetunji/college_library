"use client";
import Image from "next/image";
import Link from "next/link";
import CollegeLibraryLogo from "@/assets/images/library logo.jpg";
import { ReactNode, useContext } from "react";
import { UserContext } from "@/contexts/login";

const Navbar = () => {
  const { deleteToken, isLoggedIn } = useContext(UserContext);

  return (
    <nav className="bg-gray-800">
      <div className="flex flex-col  items-center">
        <div className="flex items-center w-full justify-between my-6 px-6">
          <Image src={CollegeLibraryLogo} alt="Logo 1" className="w-14 h-14" />
          <span className="text-white text-2xl font-bold">College Library</span>
          <Image src={CollegeLibraryLogo} alt="Logo 2" className="w-14 h-14" />
        </div>
        <div className="flex justify-between w-full h-fit border-y-2 border-red-400 px-6">
          <ul className="flex gap-4">
            <li className="ml-4">
              <Link href="/" className="text-white">
                Home
              </Link>
            </li>
            {isLoggedIn && (
              <li className="ml-4">
                <Link href="/books/borrowed" className="text-white">
                  Books
                </Link>
              </li>
            )}
            {isLoggedIn && (
              <li className="ml-4">
                <Link href="/books/reserved" className="text-white">
                  My Reservations
                </Link>
              </li>
            )}
          </ul>
          <ul className="flex gap=4">
            {isLoggedIn && (
              <li className="ml-4">
                <button onClick={() => deleteToken()} className="text-white">
                  Sign out
                </button>
              </li>
            )}
            {!isLoggedIn && (
              <li className="ml-4">
                <Link href="/sign-up" className="text-white">
                  Sign up
                </Link>
              </li>
            )}
            {!isLoggedIn && (
              <li className="ml-4">
                <Link href="/login" className="text-white">
                  Sign in
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
