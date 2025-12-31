import { Combobox } from "@/components/Combobox";
import Icons from "@/components/Icons";
import { InputWithLabel } from "@/components/InputWithLabel";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LIST_TRANSACTIONS } from "@/lib/graphql/queries/Transaction";
import { Transaction } from "@/types";
import { colorVariants, formatAmountByType, formatDate, formatType, IconsTypes } from "@/utils";
import { useQuery } from "@apollo/client/react";
import { Plus, SquarePen, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { CreateTransactionDialog } from "./components/CreateTransactionDialog";
import { DeleteTransactionDialog } from "./components/DeleteTransactionDialog";
import { UpdateTransactionDialog } from "./components/UpdateTransactionDialog";

export function Transacoes() {
  const [openDialog, setOpenDialog] = useState(false)

  const [search, setSearch] = useState("")
  const [type, setType] = useState("")
  const [category, setCategory] = useState("")
  const [period, setPeriod] = useState("")
  const [filtered, setFiltered] = useState<Transaction[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [categories, setCategories] = useState<{ label: string, value: string }[]>([])
  const [transaction, setTransaction] = useState<Transaction>({} as Transaction)
  const [openEditTransactionDialog, setOpenEditTransactionDialog] = useState(false)
  const [openDeleteTransactionDialog, setOpenDeleteTransactionDialog] = useState(false)

  const { data, loading, refetch } = useQuery<{ listTransactions: Transaction[] }>(LIST_TRANSACTIONS)

  useEffect(() => {
    // Lógica para buscar as transações com base nos filtros aplicados
    console.log({ search, type, category, period });
    const filterBySearch = (transaction: Transaction) => {
      return transaction.description.toLowerCase().includes(search.toLowerCase());
    };

    const filterByType = (transaction: Transaction) => {
      if (type === "todos" || type === "") return true;
      console.log(transaction.type.toLowerCase(), type);
      return transaction.type.toLowerCase() === type.charAt(0);
    };
    
    const filterByCategory = (transaction: Transaction) => {
      if (category === "todas" || category === "") return true;
      return transaction.category?.name.toLowerCase() === category;
    };

    const filterByPeriod = (transaction: Transaction) => {
      if (period === "todos" || period === "") return true;
      return true;
    }
    setFiltered(transactions.filter(transaction => 
      filterBySearch(transaction) && 
      filterByType(transaction) && 
      filterByCategory(transaction) && 
      filterByPeriod(transaction)
    ));
  }, [search, type, category, period])

  useEffect(() => {
    setTransactions(data?.listTransactions || [])
    setFiltered(data?.listTransactions || [])
    const cats = data?.listTransactions.map(t => t.category).filter((cat, index, self) => 
      index === self.findIndex((c) => c.id === cat.id)
    ).map(cat => ({ label: cat.name, value: cat.name.toLowerCase() }))
    setCategories([{ label: "Todas", value: "todas" }, ...cats || []])
  }, [data])

  const types = [
    { label: "Todos", value: "todos" },
    { label: "Entrada", value: "entrada" },
    { label: "Saida", value: "saida" },
  ]

  const periods = [
    { label: "Todos", value: "todos" },
    { label: "Última semana", value: "semana" },
    { label: "Último mês", value: "mes" },
    { label: "Último ano", value: "ano" },
  ]

  const handleDeleteTransaction = (transactionId: string) => {
    setTransaction(transactions.find(t => t.id === transactionId) as Transaction)
    setOpenDeleteTransactionDialog(true)
  }
  
  const handleEditTransaction = (transaction: Transaction) => {
    setTransaction(transaction)
    setOpenEditTransactionDialog(true)
  }

  if (loading || data?.listTransactions === undefined) {
    return <p>Carregando...</p>
  }

  return (
    <>
      <div>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col gap-0.5">
            <CardTitle className="font-bold text-2xl text-gray-800">Transações</CardTitle>
            <CardDescription className="text-sm text-gray-600">Gerencie todas as suas transações financeiras</CardDescription>
          </div>
          <Button variant="default" className="bg-brand-base" onClick={() => setOpenDialog(state => !state)}>
            <Plus size={16}/>Nova transação
          </Button>
        </div>

        <Card className="my-8 py-5 px-6 flex flex-row gap-4 items-center">
          <InputWithLabel
            id="search"
            label="Buscar"
            type="text"
            placeholder="Buscar por descrição"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="w-full flex flex-col gap-2">
            <Label htmlFor="type">Tipo</Label>
            <Combobox items={types} value={type} setType={setType} />
          </div>
          <div className="w-full flex flex-col gap-2">
            <Label htmlFor="category">Categoria</Label>
            <Combobox items={categories} value={category} setType={setCategory} />
          </div>
          <div className="w-full flex flex-col gap-2">
            <Label htmlFor="period">Período</Label>
            <Combobox items={periods} value={period} setType={setPeriod} />
          </div>
        </Card>

        <Card className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-medium text-gray-500 uppercase p-6">Descrição</TableHead>
                <TableHead className="text-right font-medium text-gray-500 uppercase p-6">Data</TableHead>
                <TableHead className="text-right font-medium text-gray-500 uppercase p-6">Categoria</TableHead>
                <TableHead className="text-right font-medium text-gray-500 uppercase p-6">Tipo</TableHead>
                <TableHead className="text-right font-medium text-gray-500 uppercase p-6">Valor</TableHead>
                <TableHead className="text-right font-medium text-gray-500 uppercase p-6">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length > 0 && filtered.map((transaction) => {
                const IconComponent = transaction.type === "E" ? IconsTypes['CircleArrowUp'] : IconsTypes['CircleArrowDown'];
                const IconCategory = Icons[transaction?.category?.icon as keyof typeof Icons];

                return (
                  <TableRow key={transaction.id}>
                    <TableCell className="text-left p-6 font-semibold flex flex-row items-center gap-4">
                      <div className={`h-10 w-10 rounded-xl flex items-center justify-center p-3 ${colorVariants[transaction.category.color]}`}>
                        <IconCategory size={16} />
                      </div>
                      {transaction.description}
                    </TableCell>
                    <TableCell className="text-right p-6 text-gray-600">{formatDate(transaction.date)}</TableCell>
                    <TableCell className="text-right p-6 flex flex-row items-center justify-end gap-2">
                      <CardTitle className={`${colorVariants[transaction.category.color]} w-fit rounded-xl px-3 py-1 font-medium text-sm`}>{transaction.category.name}</CardTitle>
                    </TableCell>
                    <TableCell className={`text-right p-6  font-medium ${transaction.type === "E" ? "text-green-base" : "text-red-base"}`}>
                      <div className="flex flex-row items-center justify-end gap-2"><IconComponent size={16}/>{formatType(transaction.type)}</div>
                    </TableCell>
                    <TableCell className="text-right p-6 font-semibold">{formatAmountByType(transaction.amount, transaction.type)}</TableCell>
                    <TableCell className="text-right p-6">
                      <div className="flex flex-row items-center justify-end gap-2">
                        <Button variant="outline" className="text-danger" onClick={() => handleDeleteTransaction(transaction.id)}>
                          <Trash size={24} />
                        </Button>
                        <Button variant="outline" className="text-gray-700" onClick={() => handleEditTransaction(transaction)}>
                          <SquarePen size={24} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={5} className="p-6">1 a {filtered.length}</TableCell>
                <TableCell className="text-right p-6"> {transactions.length} resultados</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </Card>
      </div>

      <CreateTransactionDialog 
        open={openDialog} 
        onOpenChange={setOpenDialog} 
        onCreated={() => refetch()}
      />
        
      <UpdateTransactionDialog
        open={openEditTransactionDialog}
        onOpenChange={setOpenEditTransactionDialog}
        onUpdated={() => refetch()}
        transaction={transaction}
      />

      <DeleteTransactionDialog
        open={openDeleteTransactionDialog}
        onOpenChange={setOpenDeleteTransactionDialog}
        onDeleted={() => refetch()}
        transactionId={transaction.id}
      />
    </>
  )
}
