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

const Register = ({
  userType,
  darkBg,
}: {
  userType: UserType;
  darkBg?: boolean;
}) => {
  const derivedIdType = userType === "student" ? "matric_no" : "staff_id";
  const derivedLabel = capitalize(derivedIdType.replace("_", " "));

  const formSchema = z.object({
    [derivedIdType]: z
      .string()
      .min(3, { message: "Please provide a valid " + derivedLabel }),
    password: z.string().min(6, { message: "che" }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      [derivedIdType]: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
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
