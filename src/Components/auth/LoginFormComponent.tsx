"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast, Toaster } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation" // 1. កែមកប្រើ useRouter

// using zod validation
const formSchema = z.object({
  email: z
    .string()
    .email("Required @ for email"),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(20, { message: "Password cannot exceed 20 characters" })
    .regex(/[A-Z]/, { message: "Must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, { message: "Must contain at least one special character" })
})

export function LoginFormComponent() {
  const router = useRouter() // 2. បង្កើត instance router

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    const postdata = async () => {
      try {
        const res = await fetch('https://sombobaeb.cheat.casa/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': "application/json"
          },
          body: JSON.stringify(data)
        })

        if (res.ok) {
          const responseData = await res.json()
          
      
          toast.success("Login Successfully!")
          setTimeout(() => {
            router.push("/") 
          }, 1500)
        } else {
          toast.error("Incorrect password or email");
        }
      } catch (error) {
        toast.error("Network error. Please try again later.");
      }
    }
    postdata();
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50/50 p-4">
      <Card className="w-full sm:max-w-md shadow-xl border-slate-200/80 bg-white rounded-2xl overflow-hidden transition-all duration-300">
        <Toaster position="bottom-right" />
        <CardHeader className="space-y-1 text-center pt-8 pb-4">
          <CardTitle className="text-3xl font-bold tracking-tight text-slate-900">Login</CardTitle>
        </CardHeader>
        <CardContent className="px-6 py-4">
          <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="space-y-4">
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="space-y-1.5">
                    <FieldLabel htmlFor="form-rhf-demo-email" className="text-sm font-semibold text-slate-700">
                      Email
                    </FieldLabel>
                    <Input
                      type="email"
                      {...field}
                      id="form-rhf-demo-email"
                      aria-invalid={fieldState.invalid}
                      placeholder="Hello@gmail.com"
                      autoComplete="off"
                      className="h-11 rounded-xl border-slate-200 focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} className="text-xs text-red-500 font-medium" />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="space-y-1.5">
                    <FieldLabel htmlFor="form-rhf-demo-password" className="text-sm font-semibold text-slate-700">
                      Password
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-password"
                      placeholder="*****"
                      type="password" 
                      aria-invalid={fieldState.invalid}
                      className="h-11 rounded-xl border-slate-200 focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} className="text-xs text-red-500 font-medium" />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="px-6 pb-8 pt-2">
          <Field orientation="horizontal" className="w-full">
            <Button 
              type="submit" 
              form="form-rhf-demo" 
              disabled={form.formState.isSubmitting} 
              className="w-full h-11 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
            >
              {form.formState.isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  )
}