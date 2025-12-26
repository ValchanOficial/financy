import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from 'type-graphql';
import {
  CreateTransactionInput,
  UpdateTransactionInput,
} from '../dtos/input/transaction.input';
import { GqlUser } from '../graphql/decorators/user.decorator';
import { IsAuth } from '../middlewares/auth.middleware';
import { CategoryModel } from '../models/category.model';
import { TransactionModel } from '../models/transaction.model';
import { UserModel } from '../models/user.model';
import { CategoryService } from '../services/category.service';
import { TransactionService } from '../services/transaction.service';
import { UserService } from '../services/user.service';

@Resolver(() => TransactionModel)
@UseMiddleware(IsAuth)
export class TransactionResolver {
  private userService = new UserService();
  private transactionService = new TransactionService();
  private categoryService = new CategoryService();

  @Mutation(() => TransactionModel)
  async createTransaction(
    @Arg('categoryId', () => String) categoryId: string,
    @Arg('data', () => CreateTransactionInput) data: CreateTransactionInput,
    @GqlUser() user: UserModel
  ): Promise<TransactionModel> {
    return this.transactionService.createTransaction(data, user.id, categoryId);
  }

  @Mutation(() => TransactionModel)
  async updateTransaction(
    @Arg('categoryId', () => String) categoryId: string,
    @Arg('data', () => UpdateTransactionInput) data: UpdateTransactionInput,
    @Arg('id', () => String) id: string
  ): Promise<TransactionModel> {
    return this.transactionService.updateTransaction(id, data, categoryId);
  }

  @Mutation(() => Boolean)
  async deleteTransaction(
    @Arg('id', () => String) id: string
  ): Promise<boolean> {
    await this.transactionService.deleteTransaction(id);
    return true;
  }

  @Query(() => [TransactionModel])
  async listTransactions(
    @GqlUser() user: UserModel
  ): Promise<TransactionModel[]> {
    return this.transactionService.listTransactions(user.id);
  }

  @Query(() => TransactionModel)
  async getTransaction(
    @Arg('id', () => String) id: string
  ): Promise<TransactionModel> {
    return this.transactionService.findTransaction(id);
  }

  @FieldResolver(() => UserModel)
  async user(@Root() Transaction: TransactionModel): Promise<UserModel> {
    return this.userService.findUser(Transaction.userId);
  }
  @FieldResolver(() => CategoryModel)
  async category(
    @Root() Transaction: TransactionModel
  ): Promise<CategoryModel> {
    return this.categoryService.findCategory(Transaction.categoryId);
  }
}
