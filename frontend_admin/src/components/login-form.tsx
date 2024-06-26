"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SERVER, capitalize } from "@/lib/utils";
import { UserType } from "@/types/users";
import { signIn } from "@/lib/actions";

const LoginForm = ({
  userTypes,
  darkBg,
  loginRoute,
}: {
  userTypes: UserType[];
  darkBg?: boolean;
  loginRoute: "staff" | "user";
}) => {
  const [userType, setUserType] = useState("");
  const derivedIdType = userType === "student" ? "matric_no" : "staff_id";
  const derivedLabel = capitalize(derivedIdType.replace("_", " "));
  const formSchema = z.object({
    uni_id: z
      .string()
      .min(3, { message: "Please provide a valid " + derivedLabel }),
    password: z.string().min(6, { message: "Minimum of 6 characters" }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      uni_id: "",
      password: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const route =
      loginRoute === "staff"
        ? userType === "admin"
          ? "admin"
          : "librarian"
        : "user";
    const endPoint = `${SERVER}/${route}`;
    const user = await signIn(endPoint, values);
  };

  return (
    <div className="w-full  bg-black/5 p-10 rounded-lg space-y-4">
      <div className=" flex justify-between">
        <p className="font-bold text-lg uppercase">Log in as</p>
        <Select
          onValueChange={(value) => setUserType(value)}
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

      {userType && (
        <div className="w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                name="uni_id"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={darkBg ? "text-white" : ""}>
                      {derivedLabel}
                    </FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={darkBg ? "text-white" : ""}>
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="text-right">
                <Button type="submit">Login</Button>
              </div>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
