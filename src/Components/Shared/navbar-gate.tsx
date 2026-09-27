"use client";

import { usePathname } from "next/navigation";

const HIDDEN_ON = ["/login", "/register"];

/** Hides the site navbar on routes that have their own full-screen layout. */
export function NavbarGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (HIDDEN_ON.includes(pathname)) return null;
  return children;
}
