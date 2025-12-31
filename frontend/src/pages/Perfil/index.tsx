import { DividerWithText } from "@/components/DividerWithText"
import { InputWithLabel } from "@/components/InputWithLabel"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { useAuthStore } from "@/stores/auth"
import { LogOut, Mail, UserRound } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export function Perfil() {
  const { logout, updateUser, user, isAuthenticated } = useAuthStore()
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState(user?.name || "")
  const navigate = useNavigate()

  const firstLetter = user?.name?.charAt(0) || ""
  const secondLetterSurename = user?.name?.split(" ")[1] || ""
  const secondLetter = secondLetterSurename ? secondLetterSurename.charAt(0) : ""


  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
     setLoading(true)

    try {
      const updateUserMutate = await updateUser({
        name: name || user?.name || "",
      }, user?.id || "");
      if (updateUserMutate) {
        toast.success("Perfil atualizado com sucesso!")
      }
    } catch (error) {
      console.error("Update error:", error)
      toast.error("Falha ao atualizar o perfil!")
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="flex justify-center items-center">
    {
      isAuthenticated && (
        <Card className="w-full max-w-md rounded-xl p-8 gap-8">
          <div className="flex flex-col items-center justify-center">
            <Avatar className="h-16 w-16 mb-4">
              <AvatarFallback className="bg-gray-300 text-gray-800 font-medium text-2xl">
                {firstLetter}{secondLetter}
              </AvatarFallback>
            </Avatar>
          <CardTitle className="text-2xl font-bold flex justify-center text-gray-800">
            {user?.name}
          </CardTitle>
          <CardDescription className="text-1xl flex justify-center text-gray-600">
            {user?.email}
          </CardDescription>
        </div>
        <DividerWithText />
        <CardContent className="px-0">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <InputWithLabel
              id="name"
              label="Nome"
              type="text"
              placeholder="Seu nome completo"
              value={name || user?.name || ""}
              required
              IconLeft={<UserRound size={16} />}
              onChange={(e) => setName(e.target.value)}
            />
            <InputWithLabel
              id="email"
              label="E-mail"
              type="email"
              placeholder="mail@exemplo.com"
              value={user?.email || ""}
              required
              IconLeft={<Mail size={16} />}
              info="O e-mail não pode ser alterado"
              disabled
              onChange={() => {}}
            />
            
            <Button type="submit" className="w-full bg-brand-base mt-2 h-12" disabled={loading}>
              Salvar alterações
            </Button> 
          </form>
          <Button variant="outline" className="w-full h-12 mt-4" onClick={handleLogout}>              
            <LogOut size={18} className="text-danger" />Sair da conta
          </Button>
        </CardContent>
      </Card>
      )
    }
    </div>
  )
}
