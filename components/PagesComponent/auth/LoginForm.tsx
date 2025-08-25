"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

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

  const onSubmit = (data: LoginFormData) => {
    console.log("Login form data:", data);
    alert("Form submitted successfully! Check console for data.");
  };

  return (
    <div className="w-full max-w-md mx-auto flex flex-col justify-center bg-white">
      <div className="flex items-center gap-2 mb-12">
        <Image src="/logo.png" alt="Logo Image" width={150} height={100} />
      </div>
      <div className="p-8">
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
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-900 transition-colors"
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
            className="w-full h-12 text-base rounded-4xl font-medium bg-[#0C21C1] hover:bg-[#0C21C1] cursor-pointer"
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}
