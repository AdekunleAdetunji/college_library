import LoginForm from "@/components/login-form";

const UserLogin = () => {
  return (
    <div className="w-full h-svh flex items-center justify-center">
      <div className="w-1/3">
        <LoginForm userTypes={["staff", "student"]} />
      </div>
    </div>
  );
};

export default UserLogin;
