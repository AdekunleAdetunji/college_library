import Book from "@/components/book";
import { mockBooks } from "../../../../../mock";
import { exploreBook } from "@/lib/actions";

const BookPage = async ({
  params: { book_id },
}: {
  params: { book_id: string };
}) => {
  const booksData = await exploreBook(book_id);
  if (!booksData.isSuccess) {
    throw new Error(booksData.message);
  }

  return (
    <div className="w-full h-full">
      <Book book={booksData.data} />
    </div>
  );
};

export default BookPage;
