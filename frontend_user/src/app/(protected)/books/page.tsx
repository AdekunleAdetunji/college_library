import BookList from "@/components/book-list";
import React from "react";
import { mockBooks } from "../../../../mock";

const page = () => {
  return (
    <div className="w-full px-20 mt-10">
      <BookList books={mockBooks} />
    </div>
  );
};

export default page;
