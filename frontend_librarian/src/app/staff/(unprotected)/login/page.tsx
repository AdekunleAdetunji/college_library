import LoginForm from "@/components/login-form";
import React from "react";

const StaffLogin = () => {
  return (
    <div className="w-full h-svh flex items-center justify-center">
      <div className="w-1/3">
        <LoginForm loginRoute="staff" userTypes={["admin", "librarian"]} />
      </div>
    </div>
  );
};

export default StaffLogin;
