import Image from "next/image";
import Link from "next/link";
import CollegeLibraryLogo from "@/assets/images/library logo.jpg";
import { ReactNode } from "react";

const Navbar = ({ children }: { children: ReactNode }) => {
  return (
    <nav className="bg-gray-800">
      <div className="flex flex-col  items-center">
        <div className="flex items-center w-full justify-between my-6 px-6">
          <Image src={CollegeLibraryLogo} alt="Logo 1" className="w-14 h-14" />
          <span className="text-white text-2xl font-bold">College Library</span>
          <Image src={CollegeLibraryLogo} alt="Logo 2" className="w-14 h-14" />
        </div>
        {children}
        <ul className="flex items-center justify-around w-full h-fit border-y-2 border-red-400">
          <li className="ml-4">
            <Link href="/" className="text-white">
              Home
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
