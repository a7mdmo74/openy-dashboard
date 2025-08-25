import LoginForm from "@/components/PagesComponent/auth/LoginForm";
import Image from "next/image";

const Login = () => {
  return (
    <div className="min-h-screen flex p-[21px]">
      <div className="flex-1 flex items-center justify-center bg-background px-8">
        <LoginForm />
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-900 to-blue-950 flex items-center justify-center p-8 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.1),transparent_50%)]"></div>

        <Image src="/login.png" alt="login image" width={500} height={500} />
      </div>
    </div>
  );
};

export default Login;
