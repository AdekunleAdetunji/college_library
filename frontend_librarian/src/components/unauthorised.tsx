"use client";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const NotLoggedIn = () => {
  const router = useRouter();
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-fit text-center">
        <p>You are not logged in</p>
        <Button onClick={() => router.push("/login")}>Log in</Button>
      </div>
    </div>
  );
};

export default NotLoggedIn;
