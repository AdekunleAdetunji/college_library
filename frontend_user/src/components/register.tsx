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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "./ui/input";
import { capitalize } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { register } from "@/lib/actions";
import { useState } from "react";
import { useToast } from "./ui/use-toast";

const Register = ({ darkBg }: { darkBg?: boolean }) => {
  const router = useRouter();
  const userTypes = ["staff", "student"];
  const [userType, setuserType] = useState("");
  const derivedLabel = userType === "student" ? "Matric no" : "Staff id";
  const { toast } = useToast();
  const formSchema = z
    .object({
      uni_id: z
        .string()
        .min(3, { message: "Please provide a valid " + derivedLabel }),
      password: z.string().min(6, { message: "Minimum of 6 characters" }),
      confirmPassword: z
        .string()
        .min(6, { message: "Minimum of 6 characters" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords must be the same",
      path: ["confirmPassword"],
    });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      uni_id: "",
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);

    const { uni_id, password } = values;
    const res = await register({
      uni_id,
      new_password: password as string,
      is_staff: userType === "staff",
    });
    if (res.isSuccess) {
      toast({
        title: "Registration info",
        description: "User Identified in school, check email for otp",
        variant: "default",
      });
      return router.push(`/sign-up/validate?uni_id=${uni_id}`);
    }
    toast({
      title: "Registration info",
      description: res.message,
      variant: "destructive",
    });
    form.reset();
  };

  return (
    <div className="w-full  bg-black/5 p-10 rounded-lg space-y-4">
      <div className=" flex justify-between">
        <p className="font-bold text-lg uppercase">Sign up as</p>
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
                <Button type="submit">Register</Button>
              </div>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
};

export default Register;
