import LoginForm from "@/components/PagesComponent/auth/LoginForm";
import Image from "next/image";

const Login = () => {
  return (
    <div className="min-h-screen flex p-[21px]">
      <div className="flex-1 flex items-center justify-center bg-background px-8">
        <LoginForm />
      </div>

      <div className="flex-1 relative rounded-[15px] bg-[#000842]">
        <Image
          className="absolute left-1/2 -translate-x-1/2 -top-1/3 translate-y-2/3"
          src="/login.png"
          alt="login image"
          width={400}
          height={400}
        />
      </div>
    </div>
  );
};

export default Login;
