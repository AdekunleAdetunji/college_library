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
import { Input } from "./ui/input";
import { resetPassword } from "@/lib/actions";

const ResetPassword = ({
  darkBg,
  endPoint,
  uni_id,
}: {
  uni_id: string;
  darkBg?: boolean;
  endPoint: "admin" | "librarian" | "user";
}) => {
  const formSchema = z
    .object({
      new_password: z.string().min(6, { message: "Minimum of 6 characters" }),
      confirmPassword: z
        .string()
        .min(6, { message: "Minimum of 6 characters" }),
    })
    .refine((data) => data.new_password === data.confirmPassword, {
      message: "Passwords must be the same",
      path: ["confirmPassword"],
    });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      new_password: "",
      confirmPassword: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { new_password } = values;
    let apiEndpoint =
      endPoint === "user"
        ? "/user/reset-password-email"
        : endPoint === "librarian"
        ? "/librarian/get-reset-code"
        : "/admin/reset-password-email";
    const res = await resetPassword(apiEndpoint, { uni_id, new_password });
    // const res = isStaffReq
    //   ? await register(
    //       endPoint,
    //       {  password: password as string },
    //       derivedIdType === "staff_id"
    //     )
    //   : await register(endPoint, { uni_id, password: password as string });
    // return res;
  };
  return (
    <div className="w-full  bg-black/5 p-10 rounded-lg space-y-4">
      <div className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              name="new_password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={darkBg ? "text-white" : ""}>
                    New Password
                  </FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="confirmPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={darkBg ? "text-white" : ""}>
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="text-right">
              <Button type="submit">Reset Password</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
