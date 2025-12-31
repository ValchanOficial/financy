import Icons from "@/components/Icons/index.tsx"
import { Card } from "@/components/ui/card.tsx"
import { colors, colorVariantsCreateCategory } from "@/utils/index.ts"
import { useMutation } from "@apollo/client/react"
import React, { useState } from "react"
import { toast } from "sonner"
import { Button } from "../../../components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { CREATE_CATEGORY } from "../../../lib/graphql/mutations/Category.ts"

interface CreateCategoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreated?: () => void
}

export function CreateCategoryDialog({
  open,
  onOpenChange,
  onCreated,
}: CreateCategoryDialogProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [color, setColor] = useState("")
  const [icon, setIcon] = useState("")

  const [createCategory, { loading }] = useMutation(CREATE_CATEGORY, {
    onCompleted() {
      toast.success("Categoria criada com sucesso")
      onOpenChange(false)
      onCreated?.()
    },
    onError() {
      toast.error("Falha ao criar a categoria")
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createCategory({
      variables: {
        data: {
          name,
          description,
          color,
          icon,
        },
      },
    })
  }

  const handleCancel = () => {
    setName("")
    setDescription("")
    setColor("")
    setIcon("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-2xl font-bold leading-tight">
            Nova categoria
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Organize suas transações com categorias
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5 mt-6">
          <div className="space-y-1">
            <Label htmlFor="name" className="text-sm font-normal" >
              Título
            </Label>
            <Input
              id="name"
              placeholder="Ex. Alimentação"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full"
              disabled={loading}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="description" className="text-sm font-normal" >
              Descrição
            </Label>
            <Input
              id="description"
              placeholder="Descrição da categoria"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full"
              disabled={loading}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="icon" className="text-sm font-normal" >
              Ícone
            </Label>
            {Object.entries(Icons).length > 0 && (
              <div className="grid grid-cols-8 gap-2 mb-2">
                {Object.entries(Icons).map(([key, IconComponent]) => (
                  <Card key={key} 
                    className={`p-2 border rounded flex items-center ${
                      icon === key ? 'border-brand-base' : 'border-transparent'
                    }`}>
                    <button
                    type="button"
                    key={key}
                    onClick={() => setIcon(key)}
                  >
                    <IconComponent />
                  </button>
                  </Card>
                ))}
              </div>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="color" className="text-sm font-normal" >
              Cor
            </Label>
            {colors.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {colors.map((colorOption) => (
                  <Card key={colorOption} 
                    className={`p-1 border rounded cursor-pointer ${
                      color === colorOption ? 'border-brand-base' : 'border-transparent'
                    }`}>
                    <div
                      className={`w-12 h-6 ${colorVariantsCreateCategory[colorOption]}`}
                      onClick={() => setColor(colorOption)}
                    />
                  </Card>
                ))}
              </div>
            )}
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              Salvar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}