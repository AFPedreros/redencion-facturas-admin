"use client"

import { useRef } from "react"
import Link from "next/link"
import { useAuth } from "@/context/auth-context"
import { doc, setDoc } from "firebase/firestore"

import { db } from "@/lib/fiebase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

interface FormData {
  email: string
  password: string
  confirmPassword: string
  name: string
}

export default function Login() {
  const { signUp } = useAuth()

  const { toast } = useToast()

  const formRef = useRef<any>({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  })

  async function handleRegistration({ email, password }: FormData) {
    try {
      await signUp(email, password)
    } catch (e) {
      console.log(e)
    }
  }

  async function handleCreateClient({ email, name }: FormData) {
    try {
      await setDoc(doc(db, "clients", email), {
        email: email,
        name: name,
      })
      console.log("Cliente creado")
    } catch (e) {
      console.error(e)
    }
  }

  async function handleOnSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()

    const data: FormData = {
      email: formRef.current.email.value,
      password: formRef.current.password.value,
      confirmPassword: formRef.current.confirmPassword.value,
      name: formRef.current.name.value,
    }

    if (!formRef.current.email.value) {
      toast({
        variant: "destructive",
        title: "Ingresar email",
        description: "Por favor ingresa un email.",
      })
      return false
    } else if (!formRef.current.password.value) {
      toast({
        variant: "destructive",
        title: "Ingresar contraseña",
        description: "Por favor ingresa una contraseña.",
      })
      return false
    }
    handleCreateClient(data)
    handleRegistration(data)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleOnSubmit(e as any)
    }
  }

  return (
    <form className="min-w-[350px] space-y-2 justify-center">
      <div>
        <h2 className="text-2xl font-semibold text-center">Crea una cuenta</h2>
        <p className="mx-auto text-sm text-center text-muted-foreground">
          Ingresa tus datos para crear una cuenta
        </p>
      </div>
      <Input
        id="name"
        ref={(el) => (formRef.current.name = el)}
        placeholder="Nombre"
        type="name"
        onKeyDown={handleKeyDown}
        required
      />
      <Input
        id="email"
        ref={(el) => (formRef.current.email = el)}
        placeholder="Correo Electrónico"
        type="email"
        onKeyDown={handleKeyDown}
        required
      />
      <Input
        id="password"
        ref={(el) => (formRef.current.password = el)}
        placeholder="•••••••••"
        type="password"
        onKeyDown={handleKeyDown}
        required
      />
      <Input
        id="confirm-password"
        ref={(el) => (formRef.current.confirmPassword = el)}
        placeholder="•••••••••"
        type="password"
        onKeyDown={handleKeyDown}
        required
      />

      <Button className="w-full" onClick={handleOnSubmit}>
        Continuar
      </Button>
      <div className="text-center">
        <p className="mx-auto text-sm text-muted-foreground">
          Dando click en continuar aceptas nuestros
        </p>
        <Link
          className="mx-auto text-sm font-semibold border-b border-primary text-primary"
          href="#"
        >
          Términos & condiciones
        </Link>
      </div>
    </form>
  )
}
