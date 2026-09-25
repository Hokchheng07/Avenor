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
import { redirect } from "next/dist/server/api-utils"

// using zod validation
const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name is required" }),
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
    .regex(/[^A-Za-z0-9]/, { message: "Must contain at least one special character" }),
})

export function RegisterFormComponent() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    const postdata = async () => {
      const res = await fetch('https://sombobaeb.cheat.casa/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify({
            username: data.name,  
      email: data.email,
      password: data.password,
        })
      })
      if (res.ok) {
        toast.success("Register Successfully!")
        setTimeout(() => {
          redirect
        }, 2000)
      } else {
        toast.error("Registration failed!");
      }
    }
    postdata();
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#FBF7F6] p-4">
      <Card className="w-full sm:max-w-md">
        <Toaster />
        <CardHeader>
          <CardTitle>Register</CardTitle>
        </CardHeader>
        <CardContent>
          <form id="form-register-demo" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-register-name">
                      Full Name
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-register-name"
                      aria-invalid={fieldState.invalid}
                      placeholder="Hello"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-register-email">
                      Email
                    </FieldLabel>
                    <Input
                      type="email"
                      {...field}
                      id="form-register-email"
                      aria-invalid={fieldState.invalid}
                      placeholder="Hello@gmail.com"
                      autoComplete="off"
                    />
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
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-register-password">
                      Password
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-register-password"
                      placeholder="*****"
                      type="Password"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal">
            <Button type="submit" form="form-register-demo">
              Register
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  )
}