import { gql } from '@apollo/client';

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($data: CreateCategoryInput!) {
    createCategory(data: $data) {
      id
      color
      countTransactions
      description
      name
      icon
      createdAt
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($deleteCategoryId: String!) {
    deleteCategory(id: $deleteCategoryId)
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory(
    $updateCategoryId: String!
    $data: UpdateCategoryInput!
  ) {
    updateCategory(id: $updateCategoryId, data: $data) {
      id
      color
      name
      description
      icon
      countTransactions
    }
  }
`;
