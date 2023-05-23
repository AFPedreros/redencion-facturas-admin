"use client"

import { useState } from "react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useAuth } from "@/context/auth-context"

import { Separator } from "@/components/ui/separator"
import { Icons } from "@/components/icons"
import Login from "@/components/login"
import SignUp from "@/components/sign-up"

const routes = {
  home: "/inicio",
}

export default function IndexPage() {
  const { user } = useAuth()
  const [register, setRegister] = useState(false)

  if (user) {
    redirect(routes.home)
  }
  return (
    <section className="container grid items-center justify-center h-screen gap-6 pt-6 pb-8 md:py-10">
      <div className="flex w-full flex-col justify-center items-center space-y-4 sm:w-[350px]">
        <Icons.logo className="w-9 h-9 text-primary" />
        {!register ? <SignUp /> : <Login />}
        <div className="min-w-[350px]">
          <Separator />
          <p className="px-8 mt-1 text-sm text-center text-muted-foreground">
            {register ? "¿Ya tienes una cuenta?" : "¿No tienes una cuenta?"}{" "}
            <span
              onClick={() => setRegister((prev) => !prev)}
              className="underline cursor-pointer hover:text-brand underline-offset-4"
            >
              {register ? "Inicia Sesión" : "Registrate"}
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}
