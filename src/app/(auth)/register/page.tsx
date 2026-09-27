import type { Metadata } from "next";
import { RegisterFormComponent } from "@/Components/auth/RegisterFormComponent"

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create an Avenor account.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function RegisterPage() {
  return <RegisterFormComponent />
}
