"use client";
import { getUser } from "@/lib/actions";
import { jwtDecode } from "jwt-decode";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
const defaultValue: {
  isLoggedIn: boolean;
  data?: { [key: string]: any } | null;
} = { isLoggedIn: false, data: null };

export const UserContext = createContext<any>(null);
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("access token"));
  const loadToken = () => {
    setToken(localStorage.getItem("access token") || "");
  };
  const setNewToken = (token: string) => {
    localStorage.setItem("access token", token);
    loadToken();
  };
  const deleteToken = () => {
    localStorage.removeItem("access token");
    loadToken();
  };
  const [user, setUser] = useState<{
    isLoggedIn: boolean;
    data?: { [key: string]: any } | null;
  }>({ isLoggedIn: false, data: null });
  const userLogIn = (data: { [key: string]: string }) => {
    setUser({ isLoggedIn: true, data: data });
    localStorage.setItem(
      "user",
      JSON.stringify({ isLoggedIn: true, data: data })
    );
  };
  const userLogOut = () => {
    setUser({ isLoggedIn: false, data: null });
    localStorage.removeItem("user");
  };

  const isLoggedIn = user.isLoggedIn;

  useEffect(() => {
    loadToken();
    const getUserData = async (uniId: string, token: string) => {
      getUser(uniId, token).then((data) => {
        if (data.isSuccess) {
          userLogIn(data.data);
        } else userLogOut();
      });
    };
    if (!token) {
      return userLogOut();
    }
    const { sub, exp } = jwtDecode(token);
    if (!sub || (exp && exp < Date.now() / 1000)) {
      return userLogOut();
    }

    if (!user.isLoggedIn) {
      getUserData(sub, token);
    }
    setIsLoadingAuth(false);
  }, [token]);
  return (
    <UserContext.Provider
      value={{
        user,
        setNewToken,
        deleteToken,
        token,
        isLoggedIn,
        loadToken,
        isLoadingAuth,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
