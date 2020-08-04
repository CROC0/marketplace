import { gql } from '@apollo/client';

export const LOGIN_USER_MUTATION = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
    }
  }
`;

export const REGISTER_USER_MUTATION = gql`
  mutation RegisterUser($username: String!, $email: String!, $password: String!) {
    registerUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`;

export const PRODUCTS_QUERY = gql`
  query Products($search: String!) {
    products(search: $search) {
      _id
      name
      price
      description
      createdAt
      user {
        initials
        _id
        username
      }
    }
  }
`;

export const CREATE_PRODUCT_MUTATION = gql`
  mutation CreateProduct($name: String!, $price: Float!, $description: String!) {
    createProduct(name: $name, price: $price, description: $description) {
      _id
      name
      price
      description
      createdAt
      user {
        initials
        _id
        username
      }
    }
  }
`;
