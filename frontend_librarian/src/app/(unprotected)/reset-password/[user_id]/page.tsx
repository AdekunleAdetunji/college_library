import LoginForm from "@/components/login-form";
import ResetPassword from "@/components/reset-password";
import React from "react";

const LibrarianResetPassword = ({
  params,
}: {
  params: { user_id: string };
}) => {
  return (
    <div className="w-full h-svh flex items-center justify-center">
      <div className="w-1/3">
        <ResetPassword uni_id={params.user_id} endPoint="user" />
      </div>
    </div>
  );
};

export default LibrarianResetPassword;
