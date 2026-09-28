"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { ArrowRight, Mail } from "lucide-react";
import { toast, Toaster } from "sonner";
import * as z from "zod";

import { PasswordInput } from "@/Components/auth/password-input";
import { publicEnv } from "@/lib/public-env";
import { Button } from "@/Components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/Components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/Components/ui/input-group";

const formSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(20, { message: "Password cannot exceed 20 characters" })
    .regex(/[A-Z]/, { message: "Must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, {
      message: "Must contain at least one special character",
    }),
});

export function LoginFormComponent() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
    mode: "onChange",
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const res = await fetch(`${publicEnv.authApiUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success("Welcome back to Avenor.");
        setTimeout(() => router.push("/"), 1500);
      } else {
        toast.error("That email and password do not match. Try again.");
      }
    } catch {
      toast.error(
        "We could not reach Avenor. Check your connection and try again.",
      );
    }
  }

  return (
    <div className="w-full">
      <Toaster position="bottom-right" />

      <header>
        <h1 className="max-w-md text-balance font-serif text-[clamp(2.55rem,4.5vw,3.75rem)] leading-[0.98] tracking-[-0.035em] text-primary">
          Welcome back
        </h1>
        <p className="mt-4 max-w-sm text-[0.95rem] leading-6 text-primary/65 sm:text-base">
          Return to the stories waiting on your shelf.
        </p>
      </header>

      <form className="mt-7" onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <FieldGroup className="gap-4">
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-2">
                <FieldLabel
                  htmlFor="form-login-email"
                  className="text-sm font-semibold text-primary"
                >
                  Email
                </FieldLabel>
                <InputGroup className="h-12 rounded-2xl border-primary/25 bg-transparent transition-[border-color,box-shadow] duration-200 has-[[data-slot=input-group-control]:focus-visible]:border-accent has-[[data-slot=input-group-control]:focus-visible]:ring-2 has-[[data-slot=input-group-control]:focus-visible]:ring-accent/20">
                  <InputGroupAddon className="pl-4 text-primary/50">
                    <Mail className="size-[1.1rem]" />
                  </InputGroupAddon>
                  <InputGroupInput
                    {...field}
                    id="form-login-email"
                    type="email"
                    autoComplete="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="you@example.com"
                    className="text-[0.95rem] text-primary placeholder:text-primary/45"
                  />
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-2">
                <FieldLabel
                  htmlFor="form-login-password"
                  className="text-sm font-semibold text-primary"
                >
                  Password
                </FieldLabel>
                <PasswordInput
                  {...field}
                  id="form-login-password"
                  autoComplete="current-password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Your password"
                  className="text-[0.95rem] text-primary placeholder:text-primary/45"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="mt-6 h-13 w-full rounded-full bg-primary px-6 font-serif text-base text-secondary shadow-[0_12px_28px_rgba(34,48,35,0.18)] transition-[transform,background-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-primary/92 hover:shadow-[0_16px_34px_rgba(34,48,35,0.24)] focus-visible:ring-accent active:translate-y-0"
        >
          <span>
            {form.formState.isSubmitting
              ? "Opening your shelf…"
              : "Enter Avenor"}
          </span>
          <ArrowRight className="ml-auto size-4" aria-hidden="true" />
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-primary/65">
        New to Avenor?{" "}
        <Link
          href="/register"
          scroll={false}
          className="font-semibold text-accent underline-offset-4 transition-colors hover:text-primary hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
}
