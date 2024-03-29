import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface AuthorInterface {
  firstname: string;
  lastname: string;
  middlename?: string;
  email: string;
}

export interface BookInterface {
  id: string;
  imgUrl?: string | StaticImport;
  title: string;
  summary: string;
  faculties: string[];
  publisher: string;
  publish_year: string;
  authors: AuthorInterface[];
}
