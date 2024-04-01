"use client";
import { useSession, signOut } from "next-auth/react";
import React from "react";

const CheckLogin = () => {
  const session = useSession();
  //   if (session.status === "authenticated" && !session.data.jwt) {
  //     console.log("called");

  //     signOut({ redirect: false });
  //   }

  console.log(session);

  return <></>;
};

export default CheckLogin;
