import LoginForm from "@/components/PagesComponent/auth/LoginForm";
import Image from "next/image";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row p-4 lg:p-[21px]">
      <div className="flex-1 flex items-center justify-center bg-background px-4 lg:px-8 order-2 lg:order-1">
        <LoginForm />
      </div>

      <div className="flex-1 relative rounded-[15px] bg-[#000842] min-h-[300px] lg:min-h-auto order-1 lg:order-2">
        <Image
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-top-1/3 lg:translate-y-2/3"
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
