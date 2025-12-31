import { gql } from '@apollo/client';

export const LIST_TRANSACTIONS = gql`
  query ListTransactions {
    listTransactions {
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

export const GET_TRANSACTION = gql`
  query GetTransaction($transactionId: String!) {
    getTransaction(id: $transactionId) {
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
