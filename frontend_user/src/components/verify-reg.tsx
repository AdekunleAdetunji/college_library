"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { ResponseInterface } from "@/types/responses";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/actions";

export function ValidateOTP({
  uni_id,
  redirectSuccess,
  action,
}: {
  uni_id: string;
  redirectSuccess: string;
  action: (values: { uni_id: string; email_code: string }) => any;
}) {
  const FormSchema = z.object({
    email_code: z.string().min(6, {
      message: "Your one-time password must be 6 characters.",
    }),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email_code: "",
    },
  });
  const { toast } = useToast();
  const router = useRouter();
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const res: ResponseInterface = await signUp({
      uni_id,
      email_code: data.email_code,
    });

    if (res.isSuccess) {
      toast({
        title: "Registration Info",
        description: "user registration success",
      });
      return router.replace("/login");
    }
    toast({
      title: "Registration Info",
      description: res.message,
      variant: "destructive",
    });

    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="email_code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>One-Time Code</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Please enter the one-time code sent to your email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-6">
          <Button variant="ghost" type="button" onClick={() => router.back()}>
            Back
          </Button>

          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
