import LoginForm from "@/components/login-form";
import ResetPassword from "@/components/reset-password";
import { ValidateOTP } from "@/components/verify";
import { SERVER } from "@/lib/utils";
import React from "react";

const LibrarianValidatePasswordReset = ({
  params,
}: {
  params: { user_id: string };
}) => {
  return (
    <div className="w-full h-svh flex items-center justify-center">
      <div className="w-1/3">
        <ValidateOTP
          uni_id={params.user_id}
          endpoint={`${SERVER}/user/reset-password`}
        />
      </div>
    </div>
  );
};

export default LibrarianValidatePasswordReset;
