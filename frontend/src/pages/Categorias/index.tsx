import Icons from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { LIST_CATEGORIES } from "@/lib/graphql/queries/Category";
import { Category } from "@/types";
import { colorVariants } from "@/utils";
import { useQuery } from "@apollo/client/react";
import { ArrowUpDown, Plus, SquarePen, Tag, Trash } from "lucide-react";
import { useState } from "react";
import { CreateCategoryDialog } from "./components/CreateCategoryDialog";
import { DeleteCategoryDialog } from "./components/DeleteCategoryDialog";
import { UpdateCategoryDialog } from "./components/UpdateCategoryDialog";

export function Categorias() {
  const [openDialog, setOpenDialog] = useState(false)
  const [openEditCategoryDialog, setOpenEditCategoryDialog] = useState(false)
  const [openDeleteCategoryDialog, setOpenDeleteCategoryDialog] = useState(false)
  const [category, setCategory] = useState<Category>({} as Category)
  const { data, loading, refetch } = useQuery<{ listCategories: Category[] }>(LIST_CATEGORIES)
  
  const categoriaMaisUtilizada = data?.listCategories.reduce((max, category) => {
    return (category.countTransactions && category.countTransactions > (max.countTransactions || 0)) ? category : max;
  }, data?.listCategories[0]);

  const response = {
    totalCategorias: data?.listCategories.length || 0,
    totalTransacoes: data?.listCategories.reduce((acc, category) => acc + (category.countTransactions ? category.countTransactions : 0), 0) || 0,
    categoriaMaisUtilizada,
    categorias: data?.listCategories || []
  }

  const Icon = Icons[response.categoriaMaisUtilizada?.icon as keyof typeof Icons];

  const handleDeleteCategory = async (categoryId: string) => {
    setCategory({ id: categoryId } as Category)
    setOpenDeleteCategoryDialog(true)
  }
  
  const handleEditCategory = (editCategory: Category) => {
    setCategory(editCategory)
    setOpenEditCategoryDialog(true)
  }

  if (loading || data?.listCategories === undefined) {
    return <p>Carregando...</p>
  }

  return (
    <>
      <div>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col gap-0.5">
            <CardTitle className="font-bold text-2xl text-gray-800">Categorias</CardTitle>
            <CardDescription className="text-sm text-gray-600">Organize suas transações por categorias</CardDescription>
          </div>
          <Button variant="default" className="bg-brand-base" onClick={() => setOpenDialog(state => !state)}>
            <Plus size={16}/>Nova categoria
          </Button>
        </div>

        <div className="flex flex-row justify-between gap-6 mt-8 mb-8">
          <Card className="uppercase flex flex-row items-start justify-left p-6 w-full">
            <Tag size={24} />
            <div className="flex flex-col gap-2">            
              <CardTitle className="font-bold text-3xl text-gray-800">{response.totalCategorias}</CardTitle>
              <CardDescription className="text-sm text-gray-500">total de categorias</CardDescription>
            </div>
          </Card>
          <Card className="uppercase flex flex-row items-start justify-left p-6 w-full">
            <ArrowUpDown size={24} className="text-purple-base" />
            <div className="flex flex-col gap-2">            
              <CardTitle className="font-bold text-3xl text-gray-800">{response.totalTransacoes}</CardTitle>
              <CardDescription className="text-sm text-gray-500">total de transações</CardDescription>
            </div>
          </Card>
          <Card className="uppercase flex flex-row items-start justify-left p-6 w-full">
            <Icon size={24} className={`text-${response.categoriaMaisUtilizada?.color}-base`}/>
            <div className="flex flex-col gap-2">            
              <CardTitle className="font-bold text-3xl text-gray-800">{response.categoriaMaisUtilizada?.name}</CardTitle>
              <CardDescription className="text-sm text-gray-500">categoria mais utilizada</CardDescription>
            </div>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {response.categorias.map((categoria) => {
            const Icon = Icons[categoria.icon as keyof typeof Icons];
            return (
              <Card className="p-6">
            <div className="flex flex-row items-center justify-between">
              <div className={`h-10 w-10 rounded-xl flex items-center justify-center p-3 ${colorVariants[categoria.color]}`}>
                <Icon size={16} />
              </div>
              <div className="flex flex-row items-center justify-between gap-2">
                <Button variant="outline" className="text-danger" onClick={() => handleDeleteCategory(categoria.id)}>
                  <Trash size={24} />
                </Button>
                <Button variant="outline" className="text-gray-700" onClick={() => handleEditCategory(categoria)}>
                  <SquarePen size={24} />
                </Button>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <CardTitle>{categoria.name}</CardTitle>
              <CardDescription>{categoria.description}</CardDescription>
            </div>
            <div className="flex flex-row items-center justify-between">
              <CardTitle className={`${colorVariants[categoria.color]} rounded-xl px-3 py-1 font-medium text-sm`}>{categoria.name}</CardTitle>
              <CardDescription className="text-gray-600 text-sm">{categoria.countTransactions} item{categoria.countTransactions || 0 > 1 ? 's' : ''}</CardDescription>
            </div>
          </Card>
            )
          })}
        </div>
      </div>

      <CreateCategoryDialog 
        open={openDialog} 
        onOpenChange={setOpenDialog} 
        onCreated={() => refetch()}
      />
        
      <UpdateCategoryDialog
        open={openEditCategoryDialog}
        onOpenChange={setOpenEditCategoryDialog}
        onUpdated={() => refetch()}
        category={category}
      />

      <DeleteCategoryDialog
        open={openDeleteCategoryDialog}
        onOpenChange={setOpenDeleteCategoryDialog}
        onDeleted={() => refetch()}
        categoryId={category.id}
      />
    </>
  )
}
