import Register from "@/components/add-book";

const AddAdmin = () => {
  return (
    <div>
      <div className="w-1/3 mx-auto mt-40">
        <Register userType="admin" />
      </div>
    </div>
  );
};

export default AddAdmin;
