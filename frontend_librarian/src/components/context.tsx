"use client";

import { UserProvider } from "@/contexts/login";
import React, { ReactNode } from "react";

const UserProviderWrap = ({ children }: { children: ReactNode }) => {
  return <UserProvider>{children}</UserProvider>;
};

export default UserProviderWrap;
