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
import { useSession } from "next-auth/react";

const ProtectRoute = ({ children }: { children: ReactNode }) => {
  const session = useSession();
  console.log(session);

  const router = useRouter();
  const [isLoading, setisLoading] = useState(false);
  const { toast } = useToast();

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className="w-full">{children}</div>
    </Suspense>
  );
};

export default ProtectRoute;
