import { gql } from '@apollo/client';

export const CREATE_TRANSACTION = gql`
  mutation CreateTransaction(
    $data: CreateTransactionInput!
    $categoryId: String!
  ) {
    createTransaction(data: $data, categoryId: $categoryId) {
      id
      type
      amount
      description
      date
      category {
        id
        name
        color
        icon
      }
    }
  }
`;

export const DELETE_TRANSACTION = gql`
  mutation DeleteTransaction($deleteTransactionId: String!) {
    deleteTransaction(id: $deleteTransactionId)
  }
`;

export const UPDATE_TRANSACTION = gql`
  mutation UpdateTransaction(
    $updateTransactionId: String!
    $data: UpdateTransactionInput!
    $categoryId: String!
  ) {
    updateTransaction(
      id: $updateTransactionId
      data: $data
      categoryId: $categoryId
    ) {
      id
      type
      amount
      description
      date
      category {
        id
        name
        color
        icon
      }
    }
  }
`;
