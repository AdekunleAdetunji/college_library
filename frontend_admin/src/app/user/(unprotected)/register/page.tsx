import React, { useState } from "react";
import Register from "@/components/register";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { capitalize, SERVER } from "@/lib/utils";
import { UserType } from "@/types/users";

console.log(SERVER);

const RegisterUser = () => {
  const userTypes = ["staff", "student"];
  const [userType, setuserType] = useState("");
  return (
    <div className="w-1/3 mx-auto mt-40">
      <div className=" flex justify-between">
        <p className="font-bold text-lg uppercase">Log in as</p>
        <Select
          onValueChange={(value) => setuserType(value)}
          defaultValue={userType}
          value={userType}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={userType} />
          </SelectTrigger>
          <SelectContent>
            {userTypes.map((user) => (
              <SelectItem key={user} value={user}>
                {capitalize(user)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Register
        userType={userType as UserType}
        isStaffReq={true}
        endPoint={`${SERVER}/user`}
      />
    </div>
  );
};

export default RegisterUser;
