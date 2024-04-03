"use client";
import * as z from "zod";
import { useFieldArray, useForm } from "react-hook-form";
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
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "./ui/input";
import { capitalize } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "./ui/use-toast";
import { BookSchema, FacultyInterface } from "@/types/book";
import { Textarea } from "./ui/textarea";
import { CalendarIcon, Minus, Plus } from "lucide-react";
import { format } from "date-fns";

const AddBook = ({
  darkBg,
  faculties,
}: {
  darkBg?: boolean;
  faculties: FacultyInterface[];
}) => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof BookSchema>>({
    resolver: zodResolver(BookSchema),
    defaultValues: {
      uni_id: "",
      title: "",
      description: "",
      publisher: "",
      publish_year: "",
      quantity: 0,
      faculties: [],
      authors: [],
    },
  });
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control: form.control, // control props comes from useForm (optional: if you are using FormProvider)
      name: "faculties", // unique name for your Field Array
    }
  );
  const selectedFaculties = form.watch("faculties");
  const facultyList = faculties
    .map((faculty) => ({ name: faculty.name }))
    .filter((faculty) => !selectedFaculties.includes(faculty));

  const onSubmit = async (values: z.infer<typeof BookSchema>) => {
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
      <div className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                name="uni_id"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={darkBg ? "text-white" : ""}>
                      Book Id
                    </FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="title"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={darkBg ? "text-white" : ""}>
                      Title
                    </FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add a mminimum of 200 characters description"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                name="publisher"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={darkBg ? "text-white" : ""}>
                      Publisher
                    </FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="publish_year"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Published on </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value as any}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormLabel>Faculties</FormLabel>
              <div className="grid grid-cols-2">
                {fields.map((field, index) => (
                  <div className="flex gap-2" key={field.id}>
                    <FormField
                      name={`faculties.${index}.name`}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              value={field.value}
                            >
                              <SelectTrigger className="w-full">
                                {field.value ? (
                                  <SelectValue placeholder="Select faculty" />
                                ) : (
                                  "Select station"
                                )}
                              </SelectTrigger>
                              <SelectContent>
                                {facultyList.map((faculty) => (
                                  <SelectItem
                                    key={faculty.name}
                                    value={faculty.name}
                                  >
                                    {faculty.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        remove(index);
                      }}
                      type="button"
                    >
                      <Minus />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="w-full flex justify-end items-center">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => append({ name: "" })}
                  type="button"
                >
                  <Plus />
                </Button>
              </div>
            </div>
            <div className="text-right">
              <Button type="submit">Add book</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddBook;
