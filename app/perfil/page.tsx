"use client"

import Link from "next/link"
import { redirect } from "next/navigation"
import { useAuth } from "@/context/auth-context"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"

const routes = {
  home: "/",
}

export default function Page() {
  const { user } = useAuth()

  if (!user) {
    redirect(routes.home)
  }

  return (
    <section className="container grid items-center gap-6 pt-16 pb-8 md:pb-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          Perfil
        </h1>
      </div>
      <div>
        <Link
          href={siteConfig.mainNav[0].href}
          rel="noreferrer"
          className={buttonVariants({ size: "lg" })}
        >
          Regresar
        </Link>
      </div>
    </section>
  )
}
