"use client";
import { UserContext } from "@/contexts/login";
import { useRouter } from "next/navigation";
import React, {
  ReactNode,
  Suspense,
  useContext,
  useEffect,
  useState,
} from "react";
import { useToast } from "./ui/use-toast";
import NotLoggedIn from "./unauthorised";
import { jwtDecode } from "jwt-decode";

const ProtectRoute = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [isLoading, setisLoading] = useState(false);
  const { toast } = useToast();
  useEffect(() => {
    const userString = localStorage.getItem("user");
    const token = localStorage.getItem("access token");
    if (!token) {
      toast({
        description: "You must be signed in to access this page",
        variant: "destructive",
      });
      return router.push("/login");
    }
    const { sub, exp } = jwtDecode(token);
    if (!sub || (exp && exp < Date.now() / 1000)) {
      toast({
        description: "You must be signed in to access this page",
        variant: "destructive",
      });
      return router.push("/login");
    }
    if (!userString) {
      toast({
        description: "You must be signed in to access this page",
        variant: "destructive",
      });
      return router.push("/login");
    }
    const user = JSON.parse(userString);
    if (!user?.isLoggedIn) {
      toast({
        description: "You must be signed in to access this page",
        variant: "destructive",
      });
      return router.push("/login");
    }
    setisLoading(false);
  }, []);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className="w-full">{children}</div>
    </Suspense>
  );
};

export default ProtectRoute;
