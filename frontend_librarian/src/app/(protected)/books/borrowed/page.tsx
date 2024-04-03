import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Title from "@/components/app_title";
import BorrowedBookList from "@/components/borrowed";
import { getBorrowedBooks } from "@/lib/actions";
import { getServerSession } from "next-auth";
import React from "react";

const BorrowedPage = async () => {
  const session = await getServerSession(authOptions);

  const booksData = await getBorrowedBooks(
    (session as any)?.user.uni_id,
    (session as any).jwt
  );
  if (!booksData.isSuccess) {
    throw new Error(booksData.message);
  }

  return (
    <div className="">
      <Title title="Borrowed Books" info="View list of books borrowed by you" />
      <BorrowedBookList rows={booksData.data} />
    </div>
  );
};

export default BorrowedPage;
