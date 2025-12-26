import { prismaClient } from '../../prisma/prisma';
import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from '../dtos/input/category.input';

export class CategoryService {
  async createCategory(data: CreateCategoryInput, userId: string) {
    return prismaClient.category.create({
      data: {
        name: data.name,
        color: data.color,
        description: data.description,
        icon: data.icon,
        userId,
      },
    });
  }

  async listCategories(userId: string) {
    return prismaClient.category.findMany({
      where: {
        userId,
      },
    });
  }

  async findCategory(id: string) {
    return prismaClient.category.findUnique({
      where: { id },
    });
  }

  async updateCategory(id: string, data: UpdateCategoryInput) {
    return prismaClient.category.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        color: data.color,
        icon: data.icon,
      },
    });
  }

  async deleteCategory(id: string) {
    return prismaClient.category.delete({
      where: { id },
    });
  }

  async listCategoriesWithTransactions(userId: string) {
    return prismaClient.category.findMany({
      where: {
        userId,
      },
      include: {
        transactions: true,
      },
    });
  }
}
