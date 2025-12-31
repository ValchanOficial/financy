export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface UpdateInput {
  name: string;
}

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  date: Date;
  type: string;
  userId: string;
  user?: User;
  categoryId: string;
  category: Category;
  createdAt: string;
  updatedAt?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  userId: string;
  user?: User;
  createdAt: string;
  updatedAt?: string;
  transactions: Transaction[];
  countTransactions?: number;
  totalAmount: number;
}
