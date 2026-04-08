"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useGetUserInfoQuery } from "@/redux/reducers/Common/UserInfo/UserInfoApi";
import { ChevronDown, LogOutIcon, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatChoiceFieldValue } from "../../../utils/formatters";

export function Navbar() {
  const router = useRouter();
  const { data: userInfo } = useGetUserInfoQuery(undefined);

  const displayName =
    [
      formatChoiceFieldValue(userInfo?.title),
      userInfo?.first_name,
      userInfo?.last_name,
    ]
      .filter(Boolean)
      .join(" ") || "User Name";

  const email = userInfo?.email || "Unknown Email";

  const initials = userInfo
    ? `${userInfo.first_name?.[0] || ""}${userInfo.last_name?.[0] || ""}`.toUpperCase() ||
      "UN"
    : "UN";

  const avatarSrc = userInfo?.profile_image || undefined;

  function clearCookie(name: string) {
    if (typeof document === "undefined") return;
    document.cookie = `${name}=; Path=/; Max-Age=0; SameSite=Lax`;
  }

  function handleLogout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("refresh");
      localStorage.removeItem("user_type");
    }

    clearCookie("token");
    clearCookie("user_type");

    router.replace("/auth/signin");
  }

  return (
    <header className="bg-background sticky top-0 z-40 flex h-12 items-center gap-3 border-b px-4">
      <SidebarTrigger className="cursor-pointer" />

      <div className="ml-auto flex items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="hover:bg-accent flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 transition-colors"
            >
              <Avatar size="sm">
                <AvatarImage src={avatarSrc} alt={displayName} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div className="text-primary flex items-center text-sm leading-none font-medium">
                {displayName}
                <ChevronDown size="16" />
              </div>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-64">
            <div className="px-2 py-1.5">
              <p className="text-muted-foreground truncate text-sm">{email}</p>
              <span className="bg-primary/15 text-primary inline-flex rounded-md px-2 py-0.5 text-xs font-medium">
                {formatChoiceFieldValue(userInfo?.user_type) || "Unknown Role"}
              </span>
            </div>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="cursor-pointer">
              <Link href="/profile" className="flex w-full items-center gap-2">
                <User />
                Profile
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              variant="destructive"
              onClick={handleLogout}
              className="cursor-pointer"
            >
              <LogOutIcon className="size-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
