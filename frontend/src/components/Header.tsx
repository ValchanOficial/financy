import logoIcon from "@/assets/Logo.svg"
import { Link, useLocation } from "react-router-dom"
import { useAuthStore } from "../stores/auth"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { Button } from "./ui/button"

export function Header() {
  const { user, isAuthenticated } = useAuthStore()
  const location = useLocation()
  const isDashboardPage = location.pathname === "/"
  const isTransactionsPage = location.pathname === "/transacoes"
  const isCategoriesPage = location.pathname === "/categorias"

  const firstLetter = user?.name?.charAt(0) || ""
  const secondLetterSurename = user?.name?.split(" ")[1] || ""
  const secondLetter = secondLetterSurename ? secondLetterSurename.charAt(0) : ""

  return (
    <div className="w-full px-16 pt-6 bg-white h-17 mb-12">
      {isAuthenticated && (
        <div className="flex justify-between w-full">
          <div className="min-w-48">
            <img src={logoIcon} />
          </div>
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button
                size="sm"
                className={`gap-2 font-semibold ${isDashboardPage ? "text-brand-base" : ""}`}
                variant="link"
              >
                Dashboard
              </Button>
            </Link>
            <Link to="/transacoes">
              <Button
                size="sm"
                className={`gap-2 font-semibold ${isTransactionsPage ? "text-brand-base" : ""}`}
                variant="link"
              >
                Transações
              </Button>
            </Link>
            <Link to="/categorias">
              <Button
                size="sm"
                className={`gap-2 font-semibold ${isCategoriesPage ? "text-brand-base" : ""}`}
                variant="link"
              >
                Categorias
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Link to='/perfil'>
              <Avatar>
              <AvatarFallback className="bg-gray-300 text-gray-800">
                {firstLetter}{secondLetter}
              </AvatarFallback>
            </Avatar>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}