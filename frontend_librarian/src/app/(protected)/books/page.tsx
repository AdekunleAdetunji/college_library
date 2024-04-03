import BookList from "@/components/book-list";
import React from "react";
import { getBooks } from "@/lib/actions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Title from "@/components/app_title";

const BookPage = async () => {
  const session = await getServerSession(authOptions);

  const booksData = await getBooks(
    (session as any)?.user.uni_id,
    (session as any).jwt
  );
  if (!booksData.isSuccess) {
    throw new Error(booksData.message);
  }

  return (
    <div className="w-full ">
      <Title
        title="Library Books"
        info="Explore the amazing wonders of literature available in our library"
      />
      <BookList books={booksData.data} />
    </div>
  );
};

export default BookPage;
