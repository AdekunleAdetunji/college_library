"use client";
import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-[url('/library.jpg')] flex flex-col gap-6 justify-center items-center relative">
      <div className="w-full h-full absolute left-0 top-0 bg-black/30"></div>
      <div className="w-2/3 text-center text-white relative">
        <p className="text-5xl font-black text-center leading-[1.5] tracking-wide">
          “A university is just a group of buildings gathered around a library.”
        </p>
        <p className="text-xl font-bold">Shelby Foote</p>
      </div>
      <div className="flex gap-8 relative">
        <Link href="/login">
          <button className="hover:text-white hover:bg-gray-800 bg-white text-gray-800 border-2 border-white rounded-md transition duration-300 py-2 px-6">Sign In</button>
        </Link>
        <Link href="/books">
          <button className="text-white bg-gray-800 hover:bg-white hover:text-gray-800 border-2 border-gray-800 rounded-md transition duration-300 py-2 px-6">
            Explore
          </button>
        </Link>
      </div>
    </main>
  );
}
