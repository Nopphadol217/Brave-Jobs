"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useRef } from "react";

/**
 * Hook to automatically sync Clerk user to database
 * Call this hook in your root layout or main app component
 */
export function useSyncUser() {
  const { isLoaded, isSignedIn, user } = useUser();
  const hasSynced = useRef(false);

  useEffect(() => {
    // Only sync once when user is loaded and signed in
    if (isLoaded && isSignedIn && user && !hasSynced.current) {
      hasSynced.current = true;

      // Call API to sync user to database
      fetch("/api/sync-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }).catch((error) => {
        console.error("Failed to sync user:", error);
        // Reset flag so it can retry on next render
        hasSynced.current = false;
      });
    }

    // Reset flag when user signs out
    if (isLoaded && !isSignedIn) {
      hasSynced.current = false;
    }
  }, [isLoaded, isSignedIn, user]);
}
