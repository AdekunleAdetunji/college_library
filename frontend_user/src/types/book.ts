import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface AuthorInterface {
  firstname: string;
  lastname: string;
  middlename?: string;
  email: string;
}
export interface FacultyInterface {
  id: string;

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
