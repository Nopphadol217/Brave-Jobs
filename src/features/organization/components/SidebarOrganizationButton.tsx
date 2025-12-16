import { Suspense} from "react";

import {
  getCurrentOrganization,
  getCurrentUser,
} from "@/services/clerk/libs/getCurrentAuth";

import { SidebarMenuButton } from "@/components/ui/sidebar";
import { LogOutIcon } from "lucide-react";
import { SignOutButton } from "@/services/clerk/components/AuthButtons";
import { SidebarOrganizationButtonClient } from "./_SidebarOrganizationButtonClient";

export function SidebarOrganizationButton() {
  return (
    <Suspense>
      <SidebarOrganizationSuspense />
    </Suspense>
  );
}

async function SidebarOrganizationSuspense() {
  const [{ user }, { organization }] = await Promise.all([
    await getCurrentUser({ allData: true }),
    getCurrentOrganization({ allData: true }),
  ]);

  if (user == null || organization == null) {
    return (
      <SignOutButton>
        <SidebarMenuButton>
          <LogOutIcon />
          <span>Log Out</span>
        </SidebarMenuButton>
      </SignOutButton>
    );
  }
  return <SidebarOrganizationButtonClient user={user} organization={organization}/>
}
