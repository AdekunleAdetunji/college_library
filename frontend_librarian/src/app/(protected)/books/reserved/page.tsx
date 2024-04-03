import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Title from "@/components/app_title";
import BorrowedBookList from "@/components/borrowed";
import ReservedBookList from "@/components/reserved";
import { getReservedBooks } from "@/lib/actions";
import { getServerSession } from "next-auth";
import React from "react";

const ReservedPage = async () => {
  const session = await getServerSession(authOptions);

  const booksData = await getReservedBooks(
    (session as any)?.user.uni_id,
    (session as any).jwt
  );
  if (!booksData.isSuccess) {
    throw new Error(booksData.message);
  }

  return (
    <div className="">
      <Title
        title="Reserved Books"
        info="View list of books you reserved for borrowing."
      />
      <ReservedBookList rows={booksData.data} />
    </div>
  );
};
export default ReservedPage;
