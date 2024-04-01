import { BookInterface } from "@/types/book";
import React from "react";
import BookCard from "./book-card";

const BookList = ({ books }: { books: BookInterface[] }) => {
  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookList;
