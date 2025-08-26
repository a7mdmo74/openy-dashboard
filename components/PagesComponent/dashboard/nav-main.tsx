"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { LucideIcon } from "lucide-react";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
  }[];
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup className="p-0">
      <SidebarGroupContent className="p-0 py-0">
        <SidebarMenu className="gap-1">
          {items.map((item) => {
            const isActive = pathname === item.url;
            return (
              <SidebarMenuItem key={item.title} className="relative">
                {/* Blue accent bar for active state */}
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r-full z-10" />
                )}
                <Link href={item.url} className="w-full">
                  <SidebarMenuButton
                    tooltip={item.title}
                    isActive={isActive}
                    className={`
                      w-full h-12 px-8 py-3 transition-all duration-200
                      flex items-center gap-3 text-left relative
                      ${
                        isActive
                          ? "text-blue-600 !bg-transparent"
                          : "text-[#B1B1B1] hover:bg-gray-50 hover:text-gray-700"
                      }
                    `}
                  >
                    {item.icon && (
                      <item.icon
                        className={`w-5 h-5 shrink-0 ${
                          isActive ? "text-[#1814F3]" : "text-[#B1B1B1]"
                        }`}
                      />
                    )}
                    <span
                      className={`font-medium text-base leading-none ${
                        isActive ? "text-[#1814F3]" : "text-[#B1B1B1]"
                      }`}
                    >
                      {item.title}
                    </span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
