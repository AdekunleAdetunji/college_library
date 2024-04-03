import { StaticImport } from "next/dist/shared/lib/get-img-props";
import * as z from "zod";

export const BookSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be minimum of 3 characters" }),
  description: z.string().min(200, {
    message: "Please provide more detailed description. (min 200 characters)",
  }),
  faculties: z.array(z.object({ name: z.string().min(3) })),
  uni_id: z
    .string()
    .min(3, { message: "Title must be minimum of 3 characters" }),
  publisher: z
    .union([
      z.string().length(0),
      z
        .string()
        .min(3, { message: "Please provide a publisher or leave blank" })
        .trim(),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  publish_year: z
    .union([z.string().length(0), z.string().datetime()])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  authors: z.array(
    z.object({
      firstname: z
        .string()
        .min(3, { message: "Firstname cannot be less than 3 characters" }),
      lastname: z
        .string()
        .min(3, { message: "Lastname cannot be less than 3 characters" }),
      middlename: z
        .string()
        .min(1, { message: "Please provide a middle name or initials" }),
      email: z
        .union([
          z.string().length(0),
          z.string().email({ message: "Provide a valid email" }),
        ])
        .optional()
        .transform((e) => (e === "" ? undefined : e)),
    })
  ),
  quantity: z.number().transform((e) => +e),
});

export interface AuthorInterface {
  firstname: string;
  lastname: string;
  middlename?: string;
  email: string;
}
export interface FacultyInterface {
  uni_id: string;
  name: string;
}

export interface BookInterface {
  id: string;
  uni_id: string;
  imgUrl?: string | StaticImport;
  title: string;
  description: string;
  faculties: FacultyInterface[];
  publisher: string;
  publish_year: string;
  authors: AuthorInterface[];
  quantity: 0;
}

export interface BookReservedInterface {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  uni_id: string;
  description: string;
  expire_date: string;
}

export interface BookBorrowedInterface {
  id: string;
  created_at: string;
  updated_at: string;
  book: {
    id: string;
    created_at: string;
    updated_at: string;
    title: string;
    uni_id: string;
  };
  active: boolean;
  overdue: boolean;
  expire_time: string;
}
