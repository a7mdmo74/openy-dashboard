"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Mail, Lock, CheckCircle, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/auth";
import { useRouter } from "next/navigation";

const loginSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  rememberMe: yup.boolean().optional().default(false),
});

type LoginFormData = yup.InferType<typeof loginSchema>;

// Dummy user database
const DUMMY_USERS = [
  {
    id: 1,
    email: "admin@example.com",
    password: "admin123",
    name: "Admin User",
    role: "admin",
  },
  {
    id: 2,
    email: "user@example.com",
    password: "user123",
    name: "Regular User",
    role: "user",
  },
  {
    id: 3,
    email: "demo@test.com",
    password: "demo123",
    name: "Demo User",
    role: "user",
  },
];

// Mock authentication function
const authenticateUser = async (
  email: string,
  password: string
): Promise<{
  success: boolean;
  user?: Omit<(typeof DUMMY_USERS)[number], "password">;
  message: string;
}> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const user = DUMMY_USERS.find(
    (u) => u.email === email && u.password === password
  );

  if (user) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;
    return {
      success: true,
      user: userWithoutPassword,
      message: "Login successful!",
    };
  }

  return {
    success: false,
    message: "Invalid email or password",
  };
};

export default function LoginForm() {
  const router = useRouter();
  const { user, login, isAuthenticated } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authMessage, setAuthMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const rememberMeValue = watch("rememberMe");

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setAuthMessage(null);

    try {
      const result = await authenticateUser(data.email, data.password);

      if (result.success && result.user) {
        setAuthMessage({
          type: "success",
          text: result.message,
        });

        // Use context login method
        login(result.user, data.rememberMe);

        console.log("Authenticated user:", result.user);
        console.log("Login form data:", data);
      } else {
        setAuthMessage({
          type: "error",
          text: result.message,
        });
      }
    } catch (error) {
      setAuthMessage({
        type: "error",
        text: `Authentication failed. ${error}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-16 md:mt-0 flex flex-col justify-center bg-white">
      <div className="flex items-center gap-2">
        <Image src="/logo.png" alt="Logo Image" width={150} height={100} />
      </div>
      <div className="p-1 mt-4 md:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-medium text-black mb-2">Sign in</h1>
          <p className="text-sm text-gray-600">
            If you don&apos;t have an account register{" "}
            <span className="flex items-center gap-1.5">
              You can
              <Link
                href="#register"
                className="text-blue-600 hover:underline font-medium"
              >
                Register here !
              </Link>
            </span>
          </p>
        </div>

        {authMessage && (
          <div
            className={`mb-4 p-3 rounded-lg flex items-center gap-2 ${
              authMessage.type === "success"
                ? "bg-green-50 border border-green-200 text-green-700"
                : "bg-red-50 border border-red-200 text-red-700"
            }`}
          >
            {authMessage.type === "success" ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <XCircle className="h-4 w-4" />
            )}
            <span className="text-sm">{authMessage.text}</span>
          </div>
        )}

        <div className="space-y-6">
          <div className="space-y-4">
            <label className="text-sm font-medium text-gray-600">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                {...register("email")}
                type="email"
                placeholder="Enter your email address"
                className="pl-10 border-0 border-b border-gray-200 bg-transparent rounded-none focus-visible:ring-0 focus-visible:border-blue-600 focus:border-blue-600"
                disabled={isLoading}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-4">
            <label className="text-sm font-medium text-gray-600">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your Password"
                className="pl-10 pr-10 border-0 border-b border-gray-200 bg-transparent rounded-none focus-visible:ring-0 focus-visible:border-blue-600 focus:border-blue-600"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-900 transition-colors"
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={rememberMeValue}
                onCheckedChange={(checked) => setValue("rememberMe", !!checked)}
                disabled={isLoading}
              />
              <label className="text-sm font-normal text-gray-700">
                Remember me
              </label>
            </div>
            <a
              href="#"
              className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
            >
              Forgot Password ?
            </a>
          </div>

          <Button
            onClick={handleSubmit(onSubmit)}
            disabled={isLoading}
            className="w-full h-12 text-base rounded-4xl font-medium bg-[#0C21C1] hover:bg-[#0C21C1] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing in..." : "Login"}
          </Button>
        </div>
      </div>
    </div>
  );
}
