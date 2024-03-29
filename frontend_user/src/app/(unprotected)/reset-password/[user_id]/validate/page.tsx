import { ValidateOTP } from "@/components/verify-reg";
import { resetPassword } from "@/lib/actions";
import React from "react";

const ValidatePasswordReset = ({ params }: { params: { user_id: string } }) => {
  return (
    <div className="w-full h-svh flex items-center justify-center">
      <div className="w-1/3">
        <ValidateOTP
          uni_id={params.user_id}
          action={resetPassword}
          redirectSuccess="/login"
        />
      </div>
    </div>
  );
};

export default ValidatePasswordReset;
