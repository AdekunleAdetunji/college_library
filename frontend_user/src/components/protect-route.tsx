"use client";
import { UserContext } from "@/contexts/login";
import { useRouter } from "next/navigation";
import React, { ReactNode, useContext } from "react";
import { useToast } from "./ui/use-toast";

const ProtectRoute = ({ children }: { children: ReactNode }) => {
  const { isLoggedIn } = useContext(UserContext);
  console.log(isLoggedIn);

  const router = useRouter();
  const { toast } = useToast();
  if (!isLoggedIn) {
    toast({
      description: "You must be signed in to access this page",
      variant: "destructive",
    });
    return router.replace("/login");
  }
  return <div className="w-full">{children}</div>;
};

export default ProtectRoute;
