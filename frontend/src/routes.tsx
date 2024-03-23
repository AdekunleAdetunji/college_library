import React from "react";
import { createBrowserRouter } from "react-router-dom";
import StaffLogin from "./pages/staff-login";
import UserLogin from "./pages/user-login";
import AddLiberian from "./pages/add-librarian";

const router = createBrowserRouter([
  { path: "/", element: <h1>Hello world</h1> },
  {
    path: "/staff",
    children: [
      {
        path: "login",
        element: <StaffLogin />,
      },
      {
        path: "admin",
        children: [
          {
            path: "add-librarian",
            element: <AddLiberian />,
          },
        ],
      },
    ],
  },
  { path: "user/login", element: <UserLogin /> },
]);

export default router;
