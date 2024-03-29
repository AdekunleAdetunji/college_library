import { BookInterface } from "@/types/book";
import MockImage from "@/assets/images/mock_book_cover.jpg";
import React from "react";
import Image from "next/image";

const BookCard = ({ book }: { book: BookInterface }) => {
  return (
    <div className="w-[200px] rounded overflow-hidden shadow-lg">
      <div className="w-full h-56">
        <Image
          className="w-full h-full"
          src={book.imgUrl || MockImage}
          alt={book.title}
          height={1000}
          width={1000}
        />
      </div>
      <div className="px-6 py-4 text-center">
        <div className="font-semibold text-lg mb-2">{book.title}</div>
        <p className="text-gray-700 text-base">
          {book.authors.map((author, index) => (
            <span key={index}>
              {author.firstname} {author.lastname}
              {index !== book.authors.length - 1 && ", "}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default BookCard;
