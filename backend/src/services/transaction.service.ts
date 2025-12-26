import { prismaClient } from '../../prisma/prisma';
import {
  CreateTransactionInput,
  UpdateTransactionInput,
} from '../dtos/input/transaction.input';

export class TransactionService {
  async createTransaction(
    data: CreateTransactionInput,
    userId: string,
    categoryId: string
  ) {
    const category = await prismaClient.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      throw new Error('Category not found');
    }

    return prismaClient.transaction.create({
      data: {
        amount: data.amount,
        description: data.description,
        date: data.date,
        type: data.type,
        userId,
        categoryId,
      },
    });
  }

  async listTransactions(userId: string) {
    return prismaClient.transaction.findMany({
      where: {
        userId,
      },
    });
  }

  async findTransaction(id: string) {
    return prismaClient.transaction.findUnique({
      where: { id },
    });
  }

  async updateTransaction(
    id: string,
    data: UpdateTransactionInput,
    categoryId: string
  ) {
    return prismaClient.transaction.update({
      where: { id },
      data: {
        amount: data.amount,
        description: data.description,
        date: data.date,
        type: data.type,
        categoryId,
      },
    });
  }

  async deleteTransaction(id: string) {
    return prismaClient.transaction.delete({
      where: { id },
    });
  }

  async countTransactionsInCategory(categoryId: string) {
    return prismaClient.transaction.count({
      where: {
        categoryId,
      },
    });
  }
}
