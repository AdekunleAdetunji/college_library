import BookList from "@/components/book-list";
import React from "react";
import { mockBooks } from "../../../../mock";
import { getBooks } from "@/lib/actions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const BookPage = async () => {
  const session = await getServerSession(authOptions);
  console.log("books", session);

  const booksData = await getBooks(session?.user.uni_id, session.jwt);
  console.log(booksData);

  return (
    <div className="w-full px-20 mt-10">
      <BookList books={mockBooks} />
    </div>
  );
};

export default BookPage;
