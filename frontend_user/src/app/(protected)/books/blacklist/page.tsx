import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Title from "@/components/app_title";
import BlacklistBookList from "@/components/blacklist";
import BorrowedBookList from "@/components/borrowed";
import ReservedBookList from "@/components/reserved";
import { getBlacklistedBooks } from "@/lib/actions";
import { getServerSession } from "next-auth";
import React from "react";

const BlacklistPage = async () => {
  const session = await getServerSession(authOptions);

  const booksData = await getBlacklistedBooks(
    (session as any)?.user.uni_id,
    (session as any).jwt
  );
  if (!booksData.isSuccess) {
    throw new Error(booksData.message);
  }
  return (
    <div className="">
      <Title
        title="Current Blacklist"
        info="View list of books you are blacklisted for.\nAvoid blacklist by reserving only books you can pick up the same day"
      />
      <BlacklistBookList rows={booksData.data} />
    </div>
  );
};
export default BlacklistPage;
