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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useContext, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { capitalize } from "@/lib/utils";
import { UserType } from "@/types/users";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const LoginForm = ({
  userTypes,
  darkBg,
}: {
  userTypes: UserType[];
  darkBg?: boolean;
}) => {
  const { toast } = useToast();
  const router = useRouter();
  const formSchema = z.object({
    uni_id: z.string().min(3, { message: "Please provide a valid id" }),
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
    toast({
      description: "You are now logging in",
      duration: 1000,
    });
    const login = await signIn("credentials", {
      redirect: false,
      callbackUrl: "/books",
      ...values,
    });
    if (login?.ok) {
      toast({
        description: "You are now logging in",
        duration: 1000,
      });
      return router.push("/books");
    }

    toast({
      description: login?.error,
      variant: "destructive",
    });
  };

  return (
    <div className="w-full h-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card className="w-full py-6 px-4">
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription className="flex flex-col">
                <span>
                  Enter your credentials below to login to your account.
                </span>
                <span className="italics font-light text-sm text-red-300">
                  Id: matric no or staff id
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <FormField
                  name="uni_id"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={darkBg ? "text-white" : ""}>
                        Id
                      </FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
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
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                Sign in
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
