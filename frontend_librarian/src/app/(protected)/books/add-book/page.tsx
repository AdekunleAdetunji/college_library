import Book from "@/components/book";
import { mockBooks } from "../../../../../mock";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { exploreBooks, getBook, getFaculties } from "@/lib/actions";
import AddBook from "@/components/add-book";

const BookPage = async ({}: {}) => {
  const session = await getServerSession(authOptions);

  const facultiesData = await getFaculties(
    (session as any)?.user.uni_id,
    (session as any).jwt
  );
  if (!facultiesData.isSuccess) {
    throw new Error(facultiesData.message);
  }

  console.log(facultiesData.data);

  return (
    <div className="w-full h-full">
      <AddBook faculties={facultiesData.data} />
    </div>
  );
};

export default BookPage;
