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
      genres
      author {
        name
        born
        bookCount
        id
      }
      id
    }
  }
`;

export const ALL_BOOKS_BY_GENRE = gql`
  query AllBooksByGenre($genre: String!) {
    allBooks(genre: $genre) {
      title
      published
      genres
      author {
        name
        born
        bookCount
        id
      }
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
      author: { name: $author }
      published: $published
      genres: $genres
    ) {
      title
      author {
        name
        born
      }
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

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const ME = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`;
