import { gql } from '@apollo/client';

export const LIST_CATEGORIES = gql`
  query ListCategories {
    listCategories {
      id
      name
      description
      icon
      color
      userId
      createdAt
      updatedAt
      countTransactions
      totalAmount
    }
  }
`;

export const GET_CATEGORY = gql`
  query GetCategory($categoryId: String!) {
    getCategory(id: $categoryId) {
      id
      name
      description
      icon
      color
      userId
      createdAt
      updatedAt
      countTransactions
      totalAmount
      transactions {
        id
        amount
        description
        date
        type
        userId
      }
    }
  }
`;
