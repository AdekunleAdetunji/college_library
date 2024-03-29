"use client";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();
  return (
    <main className="w-full h-full bg-[url('/library.jpg')] flex flex-col gap-6 justify-center items-center relative">
      <div className="w-full h-full absolute left-0 top-0 bg-black/30"></div>
      <div className="w-2/3 text-center text-white relative">
        <p className="text-5xl font-black text-center leading-[1.5] tracking-wide">
          “A university is just a group of buildings gathered around a library.”
        </p>
        <p className="text-xl font-bold">Shelby Foote</p>
      </div>
      <div className="flex gap-8">
        <Button onClick={() => router.push("/login")} size="lg">
          Sign In
        </Button>
        <Button
          onClick={() => router.push("/books")}
          size="lg"
          variant="secondary"
        >
          Explore
        </Button>
      </div>
    </main>
  );
};

export default Hero;
