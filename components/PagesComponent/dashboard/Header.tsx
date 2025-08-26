"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/context/auth";
import { Search } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export function SiteHeader() {
  const pathname = usePathname();
  const { logout } = useAuth();
  // Convert pathname into a readable title
  const getTitle = () => {
    if (pathname === "/") return "Home";
    const parts = pathname.split("/").filter(Boolean);
    return parts[parts.length - 1]
      .replace(/-/g, " ") // replace dashes with spaces
      .replace(/\b\w/g, (char) => char.toUpperCase()); // capitalize
  };

  return (
    <header className="flex h-[70px] md:h-[100px] shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-[100px] bg-white">
      <div className="flex w-full items-center h-full">
        <Separator
          orientation="vertical"
          className="data-[orientation=vertical]:h-full w-[1px] bg-[#E6EFF5]"
        />
        <div className="px-4 lg:px-6 flex w-full items-center gap-1 h-full">
          <h1 className="text-[#343C6A] font-bold text-lg md:text-[28px]">
            {getTitle()}
          </h1>
          <SidebarTrigger className="md:hidden ml-auto" />

          <div className="hidden md:flex ml-auto items-center gap-4">
            <div className="relative">
              <Search className="absolute left-8 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#718EBF]" />
              <input
                type="text"
                placeholder="Search for something"
                className="pl-14 pr-4 py-2 w-56 lg:w-64 h-[50px] rounded-[40px] bg-[#F5F7FA] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-[#718EBF]"
              />
            </div>

            <button className="p-2 text-gray-500 hover:text-gray-700 bg-gray-100 rounded-full">
              <Image src="/settings.png" alt="Icon" width={20} height={20} />
            </button>

            <button className="relative p-2 text-gray-500 hover:text-gray-700 bg-gray-100 rounded-full">
              <Image
                src="/notification.png"
                alt="Icon"
                width={20}
                height={20}
              />
            </button>

            <div
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={logout}
            >
              <Image
                src="/avatar.png"
                alt="Profile"
                className="w-full h-full object-cover"
                width={60}
                height={60}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
