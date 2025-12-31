import Logo from "@/assets/Logo.svg";
import { DividerWithText } from "@/components/DividerWithText";
import { InputWithLabel } from "@/components/InputWithLabel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/stores/auth";
import { Eye, EyeClosed, Lock, Mail, UserRoundPlus } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false)
  const login = useAuthStore((state) => state.login)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
     setLoading(true)

    try {
      const loginMutate = await login({
        email,
        password,
      })
      if (loginMutate) {
        toast.success("Login realizado com sucesso!")
      }
    } catch (error) {
      console.error("Login error:", error)
      toast.error("Falha ao realizar o login!")
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
            Fazer login
          </CardTitle>
          <CardDescription className="text-1xl flex justify-center text-gray-600">
            Entre na sua conta para continuar
          </CardDescription>
        </div>
        <CardContent className="px-0">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            />

            <div className="flex flex-row justify-between">
              <div className="flex items-center gap-3">
                <Checkbox id="remember" />
                <Label className="text-gray-700 font-normal" htmlFor="remember">Lembrar-me</Label>
              </div>
              <Link className="text-brand-base" to="/recuperar-senha">Recuperar senha</Link>
            </div>
            
            <Button type="submit" className="w-full bg-brand-base mt-2 h-12" disabled={loading}>
              Entrar
            </Button> 
          </form>
            <DividerWithText text="ou" />
            <CardDescription className="flex justify-center mb-4"> Ainda não tem uma conta?</CardDescription>
          <Button variant="outline" className="w-full h-12" asChild>              
            <Link to="/cadastro"><UserRoundPlus size={18} />Criar conta </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
