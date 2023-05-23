"use client"

import { useRef } from "react"
import Link from "next/link"
import { useAuth } from "@/context/auth-context"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

export default function Login() {
  const { login } = useAuth()

  const { toast } = useToast()

  const formRef = useRef<any>({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  })

  async function handleOnSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()

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
    console.log(formRef.current.email.value)
    console.log(formRef.current.password.value)
    console.log(formRef.current.confirmPassword.value)
    console.log(formRef.current.name.value)
    // try {
    //   await login(formRef.current.email.value, formRef.current.password.value)
    // } catch (e) {
    //   console.log(e)
    //   toast({
    //     variant: "destructive",
    //     title: "Datos incorrectos",
    //     description: "Usuario o contraseña incorrecta.",
    //   })
    // }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleOnSubmit(e as any)
    }
  }

  return (
    <form className="flex min-w-[350px] flex-col justify-center gap-3">
      <div className="mb-1">
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
      <Button onClick={handleOnSubmit}>Continuar</Button>
      <div className="flex flex-col items-center mt-1">
        <p className="mx-auto text-sm text-center text-muted-foreground">
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
