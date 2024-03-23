import React, { useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Control, UseFormGetFieldState } from "react-hook-form";

const FormInput = ({
  control,
  name,
  label,
  type,
  placeholder,
  message,
}: {
  control?: Control<any>;
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  message?: string;
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>{label}</FormLabel>

          <FormControl>
            <div className="relative">
              <Input
                type={type}
                {...field}
                onChange={(e) =>
                  field.onChange(
                    type === "number"
                      ? +e.currentTarget.value
                      : e.currentTarget.value
                  )
                }
                placeholder={placeholder}
              />
              <span className="text-sm font-light text-gray-700">
                {message}
              </span>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormInput;
