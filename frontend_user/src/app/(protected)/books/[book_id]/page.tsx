import Book from "@/components/book";
import { mockBooks } from "../../../../../mock";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {
  exploreBooks,
  getBook,
  isBookBlacklisted,
  isBookBorrowed,
  isBookReserved,
  reserveBook,
} from "@/lib/actions";
import Title from "@/components/app_title";

const BookPage = async ({
  params: { book_id },
}: {
  params: { book_id: string };
}) => {
  const session = await getServerSession(authOptions);

  const booksData = await getBook(
    (session as any)?.user.uni_id,
    book_id,
    (session as any).jwt
  );
  if (!booksData.isSuccess) {
    throw new Error(booksData.message);
  }
  const isReservedData = await isBookReserved(
    (session as any)?.user.uni_id,
    book_id,
    (session as any).jwt
  );
  const isBorrowedData = await isBookBorrowed(
    (session as any)?.user.uni_id,
    book_id,
    (session as any).jwt
  );
  const isBlacklistedData = await isBookBlacklisted(
    (session as any)?.user.uni_id,
    book_id,
    (session as any).jwt
  );
  console.log(isBlacklistedData, isBorrowedData, isReservedData);

  const reserve = reserveBook(
    (session as any)?.user.uni_id,
    book_id,
    (session as any).jwt
  );

  return (
    <div className="w-full h-full">
      <Title
        title={booksData.data.title}
        info={`Author${
          booksData.data.authors.length > 1 ? "s" : ""
        }: ${booksData.data.authors
          .map(
            (author: any) =>
              `${author.firstname} ${
                author.middlename ? author.middlename + " " : ""
              }${author.lastname}`
          )
          .join(", ")}`}
      />
      <Book
        isBlacklisted={isBlacklistedData.data}
        isBorrowed={isBorrowedData.data}
        isReserved={isReservedData.data}
        book={booksData.data}
        reserve={reserve as any}
      />
    </div>
  );
};

export default BookPage;
