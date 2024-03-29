import { BookInterface } from "@/types/book";
import Image from "next/image";
import React from "react";
import MockImage from "@/assets/images/mock_book_cover.jpg";
import { Button } from "./ui/button";

const Book: React.FC<{ book: BookInterface }> = ({ book }) => {
  book.imgUrl = book.imgUrl || MockImage;
  return (
    <div className="md:flex w-full h-full py-10">
      <div className="w-1/3 flex flex-col items-center justify-center gap-10 h-full">
        <div>
          <Image
            className="h-48 w-full object-cover md:w-48"
            src={book.imgUrl}
            alt="Book Cover"
          />
        </div>
        <div className="w-2/3 text-center space-y-5">
          <Button className="w-full">Reserve</Button>
          <Button variant="outline" className="w-full">
            Add to Watchlist
          </Button>
        </div>
      </div>
      <div className="w-2/3">
        <h2 className="block text-2xl tracking-wide mb-2 font-bold text-black">
          {book.title}
        </h2>

        <div className="mt-4">
          <span className="text-gray-800 font-semibold">
            {book.authors
              .map(
                (author) =>
                  `${author.firstname} ${
                    author.middlename ? author.middlename + " " : ""
                  }${author.lastname}`
              )
              .join(", ")}
          </span>
        </div>
        <div className="uppercase tracking-wide text-sm text-gray-500 font-medium">
          {book.publish_year}
        </div>

        <p className="mt-2 text-black">{book.summary}</p>

        <div className="mt-4">
          <ul className=" flex flex-wrap gap-3">
            {book.faculties.map((faculty, index) => (
              <li
                key={index}
                className="text-gray-800 p-2 bg-red-400 rounded-lg"
              >
                {faculty}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <p className="text-gray-600">
            Published by <span className="font-light">{book.publisher}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Book;
