import LoginForm from "@/components/login-form";
import ResetPassword from "@/components/reset-password";
import { ValidateOTP } from "@/components/verify-reg";
import { signUp } from "@/lib/actions";
import { SERVER } from "@/lib/utils";
import React from "react";

const LibrarianValidatePasswordReset = ({
  searchParams: { uni_id, is_staff },
}: {
  searchParams: { uni_id: string; is_staff: "true" | "false" };
}) => {
  return (
    <div className="w-full h-svh flex items-center justify-center">
      <div className="w-1/3">
        <ValidateOTP
          uni_id={uni_id}
          action={signUp as any}
          redirectSuccess="/login"
        />
      </div>
    </div>
  );
};

export default LibrarianValidatePasswordReset;
