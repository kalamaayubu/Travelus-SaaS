"use client";

import { useSyncExternalStore } from "react";

// Subscribe to browser events
function subscribe(callback: () => void) {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);

  // Return cleanup function
  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
}

// Get the current value of online status
function getSnapshot() {
  return navigator.onLine;
}

// Server-side status snapshot
function getServerSnapshot() {
  return true; // Assume online
}

export function useOnlineStatus() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
