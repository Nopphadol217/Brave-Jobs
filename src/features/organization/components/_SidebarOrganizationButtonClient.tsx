"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { SignOutButton } from "@/services/clerk/components/AuthButtons";
import { useClerk } from "@clerk/nextjs";

import {
  ArrowLeftRightIcon,
  Building,
  ChevronsDown,
  ChevronsUpDown,
  CreditCard,
  CreditCardIcon,
  LogOut,
  SettingsIcon,
  UserIcon,
  UserRoundCogIcon,
} from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

type User = {
  email: string;
};

type Organization = {
  name: string;
  imageUrl: string | null;
};

export function SidebarOrganizationButtonClient({
  user,
  organization,
}: {
  user: User;
  organization: Organization;
}) {
  const { isMobile, setOpenMobile } = useSidebar();

 
  const { openOrganizationProfile } = useClerk();
  return (
    <SidebarMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
            <OrganizationInfo user={user} organization={organization} />
            <ChevronsUpDown className="ml-auto group-data-[state=collapsed]:hidden" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          sideOffset={4}
          align="end"
          side={isMobile ? "bottom" : "right"}
          className="min-w-64 max-w-80"
        >
          <DropdownMenuLabel className="font-normal p-1">
            <OrganizationInfo user={user} organization={organization} />
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              openOrganizationProfile();
              setOpenMobile(false);
            }}
          >
            <Building className="mr-1" /> Manage Organization
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="employer/user-settings">
              <UserRoundCogIcon className="mr-1" /> User Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="employer/pricing">
              <CreditCardIcon className="mr-1" /> Change Plan
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/organizations/select">
              <ArrowLeftRightIcon className="mr-1" /> Switch Oranizatino
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <SignOutButton>
            <DropdownMenuItem>
              <LogOut className="mr-1" /> Log Out
            </DropdownMenuItem>
          </SignOutButton>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenu>
  );
}

function OrganizationInfo({
  organization,
  user,
}: {
  user: User;
  organization: Organization;
}) {
  const nameInitials = organization.name
    .split(" ")
    .slice(0, 2)
    .map((str) => str[0])
    .join("");
  return (
    <div className="flex items-center gap-2 overflow-hidden w-full">
      <Avatar className="rounded-lg size-8 shrink-0">
        <AvatarImage
          src={organization.imageUrl ?? undefined}
          alt={organization.name}
        />
        <AvatarFallback className="uppercase bg-primary text-primary-foreground">
          {nameInitials}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col flex-1 min-w-0 leading-tight group-data-[state=collapsed]:hidden">
        <span className="truncate text-sm font-semibold">
          {organization.name}
        </span>
        <span className="truncate text-xs">{user.email}</span>
      </div>
    </div>
  );
}
