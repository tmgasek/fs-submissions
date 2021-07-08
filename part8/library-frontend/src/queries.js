import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`;

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      author
      id
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author
      published
      genres
      id
    }
  }
`;
//     editAuthorBirth(name: String!, setBornTo: Int!): Author
export const EDIT_AUTHOR_BIRTH = gql`
  mutation editAuthorBirth($name: String!, $birthYear: Int!) {
    editAuthorBirth(name: $name, setBornTo: $birthYear) {
      name
      born
      id
    }
  }
`;
