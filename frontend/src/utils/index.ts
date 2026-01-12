import { Transaction } from '@/types';
import { CircleArrowDown, CircleArrowUp } from 'lucide-react';

export const colorVariants: Record<string, string> = {
  blue: 'text-blue-base bg-blue-light',
  purple: 'text-purple-base bg-purple-light',
  pink: 'text-pink-base bg-pink-light',
  red: 'text-red-base bg-red-light',
  orange: 'text-orange-base bg-orange-light',
  yellow: 'text-yellow-base bg-yellow-light',
  green: 'text-green-base bg-green-light',
};

export const colorVariantsCreateCategory: Record<string, string> = {
  blue: ' bg-blue-base',
  purple: 'bg-purple-base',
  pink: ' bg-pink-base',
  red: 'bg-red-base',
  orange: 'bg-orange-base',
  yellow: 'bg-yellow-base',
  green: 'bg-green-base',
};

export const colors: string[] = [
  'blue',
  'purple',
  'pink',
  'red',
  'orange',
  'yellow',
  'green',
];

export const typesMap = {
  E: 'Entrada',
  S: 'Saida',
};

export const IconsTypes = {
  CircleArrowDown: CircleArrowDown,
  CircleArrowUp: CircleArrowUp,
};

export const formatAmount = (amount: number) => {
  const formattedAmount = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(Math.abs(amount));
  return formattedAmount;
};

export const formatAmountByType = (amount: number, type: string) => {
  const formattedAmount = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(Math.abs(amount));
  return type === 'S' ? `- ${formattedAmount}` : `+ ${formattedAmount}`;
};

// 2025-12-29T00:00:00.000Z to 29/12/2025
export const formatDate = (dateString: string) => {
  const [year, month, day] = dateString.split('T')[0].split('-');
  return `${day}/${month}/${year}`;
};

// 2025-12-29T00:00:00.000Z to Dez/2025
export const formatDateMonthYear = (dateString: string) => {
  const [year, month] = dateString.split('T')[0].split('-');
  const monthNames = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ];
  return `${monthNames[parseInt(month) - 1]}/${year}`;
};

export const formatType = (type: string) => {
  return typesMap[type as keyof typeof typesMap] || type;
};

export const filterBySearch = (transaction: Transaction, search: string) => {
  return transaction.description.toLowerCase().includes(search.toLowerCase());
};

export const filterByType = (transaction: Transaction, type: string) => {
  if (type === 'todos' || type === '') return true;
  console.log(transaction.type.toLowerCase(), type);
  return transaction.type.toLowerCase() === type.charAt(0);
};

export const filterByCategory = (
  transaction: Transaction,
  category: string
) => {
  if (category === 'todas' || category === '') return true;
  return transaction.category?.name.toLowerCase() === category;
};

export const filterByPeriod = (transaction: Transaction, period: string) => {
  if (period === 'todos' || period === '') return true;
  return formatDateMonthYear(transaction.date).toLowerCase() === period;
};

export function filterByPage<T>(
  items: T[],
  page: number,
  pageSize: number
): T[] {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return items.slice(startIndex, endIndex);
}

export function getTotalPages(totalItems: number, pageSize: number): number {
  return Math.ceil(totalItems / pageSize);
}

export function paginate<T>(
  items: T[],
  page: number,
  pageSize: number
): {
  data: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
} {
  const totalItems = items.length;
  const totalPages = getTotalPages(totalItems, pageSize);
  const currentPage = Math.max(1, Math.min(page, totalPages));
  const data = filterByPage(items, currentPage, pageSize);

  return {
    data,
    currentPage,
    totalPages,
    totalItems,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
  };
}
