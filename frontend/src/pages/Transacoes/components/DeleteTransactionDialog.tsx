import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog.tsx"
import { DELETE_TRANSACTION } from "@/lib/graphql/mutations/Transaction.ts"
import { LIST_CATEGORIES } from "@/lib/graphql/queries/Category.ts"
import { useMutation } from "@apollo/client/react"
import React from "react"
import { toast } from "sonner"

interface DeleteTransactionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onDeleted?: (transactionId: string) => void
  transactionId: string
}

export function DeleteTransactionDialog({
  open,
  onOpenChange,
  onDeleted,
  transactionId,
}: DeleteTransactionDialogProps) {
  const [deleteTransaction] = useMutation(DELETE_TRANSACTION, {
    onCompleted() {
      toast.success("Transação deletada com sucesso")
      onOpenChange(false)
      onDeleted?.(transactionId)
    },
    onError() {
      toast.error("Falha ao deletar a transação")
    },
    refetchQueries: [LIST_CATEGORIES],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    deleteTransaction({
      variables: {
        deleteTransactionId: transactionId,
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
          <AlertDialogTitle>Deseja deletar a transação?</AlertDialogTitle>
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