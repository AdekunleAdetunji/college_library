"use client";
import { BookInterface } from "@/types/book";
import Image from "next/image";
import React, { startTransition } from "react";
import MockImage from "@/assets/images/mock_book_cover.jpg";
import { Button } from "./ui/button";
import { Form, useForm } from "react-hook-form";
import { reserveBook } from "@/lib/actions";
import { useSession } from "next-auth/react";
import { any } from "zod";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

const Book = ({
  book,
  isBlacklisted,
  isBorrowed,
  isReserved,
  reserve,
}: {
  book: BookInterface;
  isReserved?: boolean;
  isBorrowed?: boolean;
  isBlacklisted?: boolean;
  reserve: (...params: string[]) => Promise<any>;
}) => {
 

  book.imgUrl = book.imgUrl || MockImage;
  const { toast } = useToast();
  const router = useRouter();

  const session = useSession();
  const onSubmit = () => {
    toast({
      description: "Making book reservation",
    });
    startTransition(() => {
      reserveBook(
        session.data?.user?.uni_id,
        book.uni_id,
        (session as any)?.data?.jwt
      ).then((data) => {
        console.log(data);

        toast({
          variant: data.isSuccess ? "default" : "destructive",
          description: data.isSuccess
            ? "Book reserved"
            : "error reserving book",
        });
        router.refresh();
      });
    });
  };

  return (
    <div className="md:flex w-full h-full py-10">
      <div className="w-1/3 flex flex-col items-center  gap-10 h-full">
        <div>
          <Image
            className="h-48 w-full object-cover md:w-48"
            src={book.imgUrl}
            alt="Book Cover"
          />
        </div>
        <div className="w-2/3 text-center space-y-5">
          {isBlacklisted ? (
            <p className="text-red-500">
              *You are currently blacklisted for this book
            </p>
          ) : isBorrowed ? (
            <p>Book borrowed awaiting return</p>
          ) : isReserved ? (
            <p>Book reserved, awaiting approval</p>
          ) : (
            <Button onClick={onSubmit} className="w-full">
              Reserve
            </Button>
          )}
        </div>
      </div>
      <div className="w-2/3">
        <h2 className="block text-xl tracking-wide mb-2 font-semibold text-black">
          About this book
        </h2>

        <div className="tracking-wide text-sm text-gray-500 font-medium md:flex gap-4">
          <span className="">
            {book.publish_year && "Published on"} {book.publish_year}
          </span>
          <span>
            {book.publisher && "Published by"} {book.publisher}
          </span>
        </div>

        <p className="mt-2 text-black">{book.description}</p>

        <div className="mt-4">
          <p className="mb-3">Faculties:</p>
          <ul className=" flex flex-wrap gap-3">
            {book.faculties.map((faculty, index) => (
              <li
                key={index}
                className="text-gray-800 px-2 bg-blue-400 rounded-lg"
              >
                {faculty.uni_id}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Book;
