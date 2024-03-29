import { mockBooks } from "../../../../../../mock";
import Book from "@/components/book";

const BookPage = ({ params: { book_id } }: { params: { book_id: string } }) => {
  const book = mockBooks.find((book) => book.id === book_id);

  if (!book) {
    return <div>Book not found</div>;
  }

  return (
    <div className="w-full h-full">
      <Book book={book} />
      {/* You can add additional details or styling specific to a single book page here */}
    </div>
  );
};

export default BookPage;
