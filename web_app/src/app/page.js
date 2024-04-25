"use client";
import React from "react";
import Link from "next/link";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="w-full">
      <section className="w-full min-h-screen bg-[url('/library.jpg')] flex flex-col gap-6 justify-center items-center relative">
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
      </section>
      <section className="w-full">
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 dark:bg-gray-100 dark:text-gray-800">
          <h2 className="mb-8 text-4xl font-bold leading-none text-center">Library Hours</h2>
          <ul className="grid gap-3 grid-cols-1">
            <li className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current dark:text-violet-600">
                <path d="M426.072,86.928A238.75,238.75,0,0,0,88.428,424.572,238.75,238.75,0,0,0,426.072,86.928ZM257.25,462.5c-114,0-206.75-92.748-206.75-206.75S143.248,49,257.25,49,464,141.748,464,255.75,371.252,462.5,257.25,462.5Z"></path>
                <polygon points="221.27 305.808 147.857 232.396 125.23 255.023 221.27 351.063 388.77 183.564 366.142 160.937 221.27 305.808"></polygon>
              </svg>
              <span>Monday to Thursday: <b>8:00 AM</b> - <b>10:00 PM</b></span>
            </li>
            <li className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current dark:text-violet-600">
                <path d="M426.072,86.928A238.75,238.75,0,0,0,88.428,424.572,238.75,238.75,0,0,0,426.072,86.928ZM257.25,462.5c-114,0-206.75-92.748-206.75-206.75S143.248,49,257.25,49,464,141.748,464,255.75,371.252,462.5,257.25,462.5Z"></path>
                <polygon points="221.27 305.808 147.857 232.396 125.23 255.023 221.27 351.063 388.77 183.564 366.142 160.937 221.27 305.808"></polygon>
              </svg>
              <span>Friday: <b>7:30 AM</b> - <b>4:00 PM</b></span>
            </li>
            <li className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current dark:text-violet-600">
                <path d="M426.072,86.928A238.75,238.75,0,0,0,88.428,424.572,238.75,238.75,0,0,0,426.072,86.928ZM257.25,462.5c-114,0-206.75-92.748-206.75-206.75S143.248,49,257.25,49,464,141.748,464,255.75,371.252,462.5,257.25,462.5Z"></path>
                <polygon points="221.27 305.808 147.857 232.396 125.23 255.023 221.27 351.063 388.77 183.564 366.142 160.937 221.27 305.808"></polygon>
              </svg>
              <span>Satruday & Sunday: <b>Closed</b> </span>
            </li>
          </ul>
        </div>
      </section>
      <Contact />
    </main>
  );
}
