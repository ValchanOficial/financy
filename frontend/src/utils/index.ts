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

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR');
};

export const formatType = (type: string) => {
  return typesMap[type as keyof typeof typesMap] || type;
};
