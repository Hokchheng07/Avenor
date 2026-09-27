"use client"

import * as React from "react"
import { Eye, EyeOff, Lock } from "lucide-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/Components/ui/input-group"

type PasswordInputProps = Omit<React.ComponentProps<"input">, "type">

export function PasswordInput({ className, ...props }: PasswordInputProps) {
  const [visible, setVisible] = React.useState(false)

  return (
    <InputGroup className="h-12 rounded-2xl border-primary/25 bg-transparent transition-[border-color,box-shadow] duration-200 has-[[data-slot=input-group-control]:focus-visible]:border-accent has-[[data-slot=input-group-control]:focus-visible]:ring-2 has-[[data-slot=input-group-control]:focus-visible]:ring-accent/20">
      <InputGroupAddon className="pl-4 text-primary/50">
        <Lock className="size-[1.1rem]" />
      </InputGroupAddon>
      <InputGroupInput
        {...props}
        type={visible ? "text" : "password"}
        className={className}
      />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          size="icon-sm"
          className="mr-1 rounded-full text-primary/55 hover:bg-primary/7 hover:text-primary"
          aria-label={visible ? "Hide password" : "Show password"}
          onClick={() => setVisible((v) => !v)}
        >
          {visible ? <EyeOff /> : <Eye />}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}
