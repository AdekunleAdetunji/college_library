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
import { capitalize } from "@/lib/utils";
import { UserType } from "@/types/users";
import { register } from "@/lib/actions";

const Register = ({
  userType,
  darkBg,
  isStaffReq,
  endPoint,
}: {
  userType: UserType;
  darkBg?: boolean;
  isStaffReq?: boolean;
  endPoint: string;
}) => {
  const derivedIdType = userType === "student" ? "matric_no" : "staff_id";
  const derivedLabel = capitalize(derivedIdType.replace("_", " "));

  const formSchema = z.object({
    [derivedIdType]: z
      .string()
      .min(3, { message: "Please provide a valid " + derivedLabel }),
    password: z.string().min(6, { message: "Minimum of 6 characters" }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      [derivedIdType]: "",
      password: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { [derivedIdType]: uni_id, password } = values;
    const res = isStaffReq
      ? await register(
          endPoint,
          { uni_id, password: password as string },
          derivedIdType === "staff_id"
        )
      : await register(endPoint, { uni_id, password: password as string });
    return res;
  };
  return (
    <div className="w-full  bg-black/5 p-10 rounded-lg space-y-4">
      {userType && (
        <div className="w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                name={derivedIdType}
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
