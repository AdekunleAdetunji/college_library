import Register from "@/components/register";
import { SERVER } from "@/lib/utils";

const AddLiberian = () => {
  return (
    <div>
      <div className="w-1/3 mx-auto mt-40">
        <Register
          endPoint={`${SERVER}/admin/add-liberarian`}
          userType="librarian"
        />
      </div>
    </div>
  );
};

export default AddLiberian;
