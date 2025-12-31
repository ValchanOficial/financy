import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog.tsx"
import { LIST_CATEGORIES } from "@/lib/graphql/queries/Category.ts"
import { useMutation } from "@apollo/client/react"
import React from "react"
import { toast } from "sonner"
import { DELETE_CATEGORY } from "../../../lib/graphql/mutations/Category.ts"

interface DeleteCategoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onDeleted?: (categoryId: string) => void
  categoryId: string
}

export function DeleteCategoryDialog({
  open,
  onOpenChange,
  onDeleted,
  categoryId,
}: DeleteCategoryDialogProps) {
  const [deleteCategory] = useMutation(DELETE_CATEGORY, {
    onCompleted() {
      toast.success("Categoria deletada com sucesso")
      onOpenChange(false)
      onDeleted?.(categoryId)
    },
    onError() {
      toast.error("Falha ao deletar a categoria")
    },
    refetchQueries: [LIST_CATEGORIES],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    deleteCategory({
      variables: {
        deleteCategoryId: categoryId,
      },
    })
  }

  const handleCancel = () => {
    onOpenChange(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deseja deletar a categoria?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-danger" onClick={handleSubmit}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}