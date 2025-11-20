"use client";
import { ClerkProvider as OriginalClerkProvider } from "@clerk/nextjs";
import { ReactNode, Suspense } from "react";
import { dark } from "@clerk/themes";
import { UseIsDarkMode } from "@/hooks/useIsDarkMode";

export function ClerkProvider({ children }: { children: ReactNode }) {
  const isDarkMode = UseIsDarkMode();

  return (
    <Suspense >
      <OriginalClerkProvider
        appearance={isDarkMode ? { baseTheme: [dark] } : undefined}
      >
  
        {children}
      </OriginalClerkProvider>
    </Suspense>
  );
}
