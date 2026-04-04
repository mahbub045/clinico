"use client";

import { Home, LogOutIcon, StethoscopeIcon, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";

const navItems = [
  { href: "/dashboard/doctor", label: "Home", icon: Home },
  {
    href: "/dashboard/doctor/appointments",
    label: "Appointments",
    icon: StethoscopeIcon,
  },
  { href: "/dashboard/doctor/patients", label: "Patients", icon: Users },
] as const;

export function AppSidebar() {
  const pathname = usePathname();
  const normalizedPathname = pathname?.replace(/\/$/, "") ?? "";

  const activeItem = navItems
    .slice()
    .sort((a, b) => b.href.length - a.href.length)
    .find(
      (item) =>
        normalizedPathname === item.href ||
        normalizedPathname.startsWith(`${item.href}/`),
    );

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex h-[31] items-center px-2 text-sm font-semibold">
          <Link
            href="/dashboard/doctor"
            className="truncate text-3xl text-primary"
          >
            ClinicO
          </Link>
        </div>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = item.href === activeItem?.href;
                const Icon = item.icon;

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.label}
                      className={`text-primary! ${isActive ? "bg-primary/10!" : ""}`}
                    >
                      <Link href={item.href}>
                        <Icon />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {/* <SidebarSeparator /> */}
      <SidebarFooter>
        <div className="px-2 pb-2">
          <Button
            variant="danger"
            size="sm"
            className="w-full justify-center gap-2 rounded-lg text-sm font-semibold cursor-pointer"
            onClick={() => {
              // TODO: replace with real logout action
              console.log("Logout clicked");
            }}
          >
            <LogOutIcon className="size-4" />
            Logout
          </Button>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
