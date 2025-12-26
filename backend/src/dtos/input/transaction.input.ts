import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateTransactionInput {
  @Field(() => Number)
  amount!: number;

  @Field(() => String)
  description!: string;

  @Field(() => Date)
  date!: Date;

  @Field(() => String)
  type!: string;
}

@InputType()
export class UpdateTransactionInput {
  @Field(() => Number, { nullable: true })
  amount?: number;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Date, { nullable: true })
  date?: Date;

  @Field(() => String, { nullable: true })
  type?: string;
}
