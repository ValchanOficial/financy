import { Field, GraphQLISODateTime, ID, ObjectType } from 'type-graphql';
import { CategoryModel } from './category.model';
import { UserModel } from './user.model';

@ObjectType()
export class TransactionModel {
  @Field(() => ID)
  id!: string;

  @Field(() => Number)
  amount!: number;

  @Field(() => String)
  description!: string;

  @Field(() => GraphQLISODateTime)
  date!: Date;

  @Field(() => String)
  type!: string;

  @Field(() => String)
  userId!: string;

  @Field(() => UserModel, { nullable: true })
  user?: UserModel;

  @Field(() => String)
  categoryId!: string;

  @Field(() => CategoryModel, { nullable: true })
  category?: CategoryModel;

  @Field(() => GraphQLISODateTime)
  createdAt!: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date;
}
