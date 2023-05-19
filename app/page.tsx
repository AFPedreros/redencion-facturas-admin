"use client"

import Link from "next/link"
import { redirect } from "next/navigation"
import { useAuth } from "@/context/auth-context"

import { Icons } from "@/components/icons"
import Login from "@/components/login"

const routes = {
  profile: "/perfil",
}

export default function IndexPage() {
  const { user } = useAuth()

  if (user) {
    redirect(routes.profile)
  }
  return (
    <section className="container grid items-center h-screen gap-6 pt-6 pb-8 md:py-10">
      <div className="flex flex-col items-center">
        <Icons.logo className="mb-2 w-9 h-9 text-primary" />
        <div className=" flex w-full flex-col space-y-6 sm:w-[350px]">
          <Login />
        </div>
        <p className="px-8 mt-4 text-sm text-center text-muted-foreground">
          <Link
            href="/"
            className="underline hover:text-brand underline-offset-4"
          >
            ¿No tienes una cuenta? Registrate
          </Link>
        </p>
      </div>
    </section>
  )
}
