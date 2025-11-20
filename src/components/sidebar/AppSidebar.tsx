import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { Children, ReactNode, Suspense } from "react";

import { SignedIn} from "@/services/clerk/components/SignInStatus";

import { AppSidebarClient } from "./_AppSidebarClient";

export function AppSidebar({
    children,
  content,
  footerButton,
}: {
    children:ReactNode
  content: ReactNode;
  footerButton: ReactNode;
}) {return(

  <SidebarProvider className="overflow-y-hidden">
    <AppSidebarClient>
      <Sidebar collapsible="icon" className="overflow-hidden">
        <SidebarHeader className="flex-row">
          <SidebarTrigger />
          <span className="text-xl text-nowrap">BRAVE Jobs</span>
        </SidebarHeader>
        <SidebarContent>{content}</SidebarContent>
        <SignedIn>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>{footerButton}</SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </SignedIn>
      </Sidebar>
      <main className="flex-1">{children}</main>
    </AppSidebarClient>
  </SidebarProvider>
)
}
