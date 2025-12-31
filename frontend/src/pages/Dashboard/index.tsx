import Icons from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LIST_CATEGORIES } from "@/lib/graphql/queries/Category";
import { LIST_TRANSACTIONS } from "@/lib/graphql/queries/Transaction";
import { Category, Transaction } from "@/types";
import { colorVariants, formatAmount, formatAmountByType, formatDate, IconsTypes } from "@/utils";
import { useQuery } from "@apollo/client/react";
import { ArrowDownCircle, ArrowUpCircle, ChevronRight, Plus, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CreateTransactionDialog } from "../Transacoes/components/CreateTransactionDialog";

export function Dashboard() {
  const [openDialog, setOpenDialog] = useState(false)

  const { data: dataT, loading: loadingT, refetch: refetchT } = useQuery<{ listTransactions: Transaction[] }>(LIST_TRANSACTIONS)
  const { data: dataC, loading: loadingC, refetch: refetchC } = useQuery<{ listCategories: Category[] }>(LIST_CATEGORIES)

  const values = {
    total: dataT?.listTransactions.reduce((acc, transaction) => {
      return transaction.type === "E" ? acc + transaction.amount : acc - transaction.amount;
    }, 0) || 0,
    income: dataT?.listTransactions.reduce((acc, transaction) => {
      return transaction.type === "E" ? acc + transaction.amount : acc;
    }, 0) || 0,
    expense: dataT?.listTransactions.reduce((acc, transaction) => {
      return transaction.type === "S" ? acc + transaction.amount : acc;
    }, 0) || 0,
  }

  useEffect(() => {
    refetchT();
    refetchC();
  }, [])

  if (loadingT || dataT?.listTransactions === undefined || loadingC || dataC?.listCategories === undefined) {
    return <p>Carregando...</p>
  }

  return (
    <>
      <div>

        <div className="flex flex-row justify-between gap-6 mb-8">
          <Card className="uppercase flex flex-row items-start justify-left p-6 w-full">
            <Wallet size={24} className="text-purple-base"/>
            <div className="flex flex-col gap-2">            
              <CardDescription className="text-sm text-gray-500">SALDO TOTAL</CardDescription>
              <CardTitle className="font-bold text-3xl text-gray-800">{formatAmount(values.total)}</CardTitle>
            </div>
          </Card>
          <Card className="uppercase flex flex-row items-start justify-left p-6 w-full">
            <ArrowUpCircle size={24} className="text-green-base" />
            <div className="flex flex-col gap-2">            
              <CardDescription className="text-sm text-gray-500">RECEITAS DO MÊS</CardDescription>
              <CardTitle className="font-bold text-3xl text-gray-800">{formatAmount(values.income)}</CardTitle>
            </div>
          </Card>
          <Card className="uppercase flex flex-row items-start justify-left p-6 w-full">
            <ArrowDownCircle size={24} className={`text-red-base`}/>
            <div className="flex flex-col gap-2">            
              <CardDescription className="text-sm text-gray-500">DESPESAS DO MÊS</CardDescription>
              <CardTitle className="font-bold text-3xl text-gray-800">{formatAmount(values.expense)}</CardTitle>
            </div>
          </Card>
        </div>

        <div className="flex flex-row gap-6">
          <Card className="p-0 w-full h-fit">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead colSpan={2} className="font-medium text-gray-500 uppercase p-6 w-full">Transações recentes</TableHead>
                  <TableHead className="">
                    <Link to="/transacoes">
                      <Button
                        size="sm"
                        variant="link"
                        className="text-brand-base flex flex-row items-center gap-1 text-right"
                      >
                        Ver todas <ChevronRight size={20}/>
                      </Button>
                    </Link>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dataT.listTransactions.length > 0 && dataT.listTransactions.slice(0, 5).map((transaction) => {
                  const IconCategory = Icons[transaction?.category?.icon as keyof typeof Icons];
                  const IconArrow = transaction.type === "E" ? IconsTypes['CircleArrowUp'] : IconsTypes['CircleArrowDown'];
                  return (
                    <TableRow key={transaction.id}>
                      <TableCell className="text-left p-6 font-semibold flex flex-row items-center gap-4">
                        <div className={`h-10 w-10 rounded-xl flex items-center justify-center p-3 ${colorVariants[transaction.category.color]}`}>
                          <IconCategory size={16} />
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <p className="font-medium text-sm text-gray-800">{transaction.description}</p>
                          <p className="font-regular text-sm text-gray-600">{formatDate(transaction.date)}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-right p-6">
                        <CardTitle className={`${colorVariants[transaction.category.color]} w-fit rounded-xl px-3 py-1 font-medium text-sm`}>{transaction.category.name}</CardTitle>
                      </TableCell>
                      <TableCell className="text-right p-6 font-semibold">
                        {formatAmountByType(transaction.amount, transaction.type)}
                        <IconArrow size={16} className={`inline-block ml-2 ${transaction.type === "E" ? "text-green-base" : "text-red-base"}`}/>
                      </TableCell>
                  
                    </TableRow>
                  )
                })}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={4} className="p-0 h-16 bg-white">
                    <Button variant="ghost" className="w-full text-brand-base h-full" onClick={() => setOpenDialog(true)}>
                      <Plus size={20} />
                      Nova transação
                    </Button>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </Card>

          <Card className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead colSpan={2} className="font-medium text-gray-500 uppercase p-6">categorias</TableHead>
                  <TableHead className="">
                    <Link to="/categorias">
                      <Button
                        size="sm"
                        variant="link"
                        className="text-brand-base flex flex-row items-center gap-1 text-right"
                      >
                        Gerenciar <ChevronRight size={20}/>
                      </Button>
                    </Link>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dataC.listCategories.length > 0 && dataC.listCategories.map((categoria) => {
                  return (
                    <TableRow key={categoria.id}>
                      <TableCell className="text-right p-6 font-semibold flex flex-row items-center gap-4 ">
                        <CardTitle className={`${colorVariants[categoria.color]} w-fit rounded-xl px-3 py-1 font-medium text-sm`}>{categoria.name}</CardTitle>
                      </TableCell>

                      <TableCell className="text-right p-6 text-gray-600 ">
                        {categoria.countTransactions} item{categoria.countTransactions || 0 > 1 ? 's' : ''}
                      </TableCell>
                      
                      <TableCell className="text-right p-6 ">
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        }).format(categoria.totalAmount)}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </Card>
        </div>
      </div>

      <CreateTransactionDialog 
        open={openDialog} 
        onOpenChange={setOpenDialog} 
        onCreated={() => refetchT()}
      />
    </>
  )
}