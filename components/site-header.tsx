"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useAuth } from "@/context/auth-context"
import { collection, doc, getDoc } from "firebase/firestore"
import { useCollection } from "react-firebase-hooks/firestore"

import { siteConfig } from "@/config/site"
import { db } from "@/lib/fiebase"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  const { user, logout } = useAuth()
  // if (!user) {
  //   return null
  // }

  const [value, loading, error] = useCollection(collection(db, "clients"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  })

  const [name, setName] = useState("")

  useEffect(() => {
    if (user) {
      const docRef = doc(db, "clients", user?.email)
      const fetchData = async () => {
        const docSnap = await getDoc(docRef)
        setName(`${docSnap?.data()?.name}`)
      }
      try {
        fetchData()
      } catch (err) {
        console.log(err)
      }
    }

    // const docRef = doc(db, "clients", user?.email)
    // const fetchData = async () => {
    //   const docSnap = await getDoc(docRef)
    //   setName(`${docSnap?.data()?.name}`)
    // }
    // try {
    //   fetchData()
    // } catch (err) {
    //   console.log(err)
    // }
  }, [value, user])

  function getInitials(name: string | undefined) {
    if (!name) {
      return ""
    }
    const words = name.split(" ") // split the name into an array of words
    let initials = "" // initialize the variable to store the initials

    for (let i = 0; i < words.length && initials.length < 2; i++) {
      const word = words[i]
      if (word.length > 0) {
        initials += word[0].toUpperCase() // add the first letter of the word to the initials string
      }
    }

    return initials
  }

  return (
    <header
      className={cn(
        "absolute top-0 z-40 w-full border-b border-border bg-background",
        user ? "block" : "hidden"
      )}
    >
      <div className="container flex items-center h-16 space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex items-center justify-end flex-1 space-x-4">
          <nav className="flex items-center space-x-1">
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative w-8 h-8 rounded-full"
                >
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="" alt="" />
                    <AvatarFallback>{getInitials(name)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-screen md:w-56"
                align="end"
                forceMount
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col justify-center h-12 space-y-1 md:h-8">
                    <p className="text-sm font-medium leading-none">{name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild className="h-12 md:h-8">
                    <Link href="/perfil" className="flex w-full h-full">
                      <Icons.user className="w-4 h-4 mr-2" />
                      <span>Mi cuenta</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={async () => {
                    try {
                      await logout()
                    } catch (err) {
                      console.log(err)
                    }
                  }}
                  className="h-12 md:h-8"
                >
                  <Icons.logOut className="w-4 h-4 mr-2" />
                  <span>Cerrar sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </div>
    </header>
  )
}
