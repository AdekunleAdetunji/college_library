import { BookInterface } from "@/types/book";
import React from "react";
import BookCard from "./book-card";
import Link from "next/link";

const BookList = ({ books }: { books: BookInterface[] }) => {
  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {books.map((book) => (
        <Link key={book.uni_id} href={`/books/${book.uni_id}`}>
          <BookCard book={book} />
        </Link>
      ))}
    </div>
  );
};

export default BookList;
