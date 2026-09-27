import type { Metadata } from "next";
import { LoginFormComponent } from "@/Components/auth/LoginFormComponent"

export const metadata: Metadata = {
  title: "Log In",
  description: "Log in to your Avenor account.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function LoginPage() {
  return <LoginFormComponent />
}
