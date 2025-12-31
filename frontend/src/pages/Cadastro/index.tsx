import Logo from "@/assets/Logo.svg";
import { DividerWithText } from "@/components/DividerWithText";
import { InputWithLabel } from "@/components/InputWithLabel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/stores/auth";
import { Eye, EyeClosed, Lock, LogIn, Mail, UserRound } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export function Cadastro() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false)
  const signup = useAuthStore((state) => state.signup)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
     setLoading(true)

    try {
      const signupMutate = await signup({
        name,
        email,
        password,
      })
      if (signupMutate) {
        toast.success("Cadastro realizado com sucesso!")
      }
    } catch (error) {
      console.error("Cadastro error:", error)
      toast.error("Falha ao realizar o cadastro!")
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="p-8 flex flex-col items-center justify-center gap-8">
      <img src={Logo} alt="Financy Logo" />
      <Card className="w-full max-w-md rounded-xl p-8 gap-8">
        <div>
          <CardTitle className="text-2xl font-bold flex justify-center text-gray-800">
            Criar conta
          </CardTitle>
          <CardDescription className="text-1xl flex justify-center text-gray-600">
            Comece a controlar suas finanças ainda hoje
          </CardDescription>
        </div>
        <CardContent className="px-0">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <InputWithLabel
              id="name"
              label="Nome completo"
              type="text"
              placeholder="Seu nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              IconLeft={<UserRound size={16} />}
            />
            <InputWithLabel
              id="email"
              label="E-mail"
              type="email"
              placeholder="mail@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              IconLeft={<Mail size={16} />}
            />
            <InputWithLabel
              id="password"
              label="Senha"
              type={passwordVisible ? "text" : "password"}
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              IconLeft={<Lock size={16} />}
              IconRight={passwordVisible ? 
                <Eye className="hover:cursor-pointer" size={16} onClick={() => setPasswordVisible(false)} /> : 
                <EyeClosed className="hover:cursor-pointer" size={16} onClick={() => setPasswordVisible(true)} />
              }
              info="A senha deve ter no mínimo 8 caracteres"
            />
            
            <Button type="submit" className="w-full bg-brand-base mt-2 h-12" disabled={loading}>
              Cadastrar
            </Button> 
          </form>
            <DividerWithText text="ou" />
            <CardDescription className="flex justify-center mb-4">Já tem uma conta?</CardDescription>
          <Button variant="outline" className="w-full h-12" asChild>              
            <Link to="/login"><LogIn size={18} />Fazer login</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
