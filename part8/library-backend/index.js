const config = require('./config');
const { ApolloServer, gql, UserInputError } = require('apollo-server');
//const { v1: uuid } = require('uuid');
const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');
const Author = require('./models/author');
const Book = require('./models/book');

console.log('connecting to', config.MONGODB_URI);
mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(console.log('connected to MongoDB'))
  .catch((err) => console.log('error', err.message));

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    bookCount: Int
    id: ID!
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthorBirth(name: String!, setBornTo: Int!): Author
  }
`;

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: () => {
      // if (args.author) {
      //   let booksByAuthor = books.filter((book) => book.author === args.author);
      //   if (args.genre) {
      //     const booksByAuthorAndGenre = booksByAuthor.filter((book) =>
      //       book.genres.includes(args.genre)
      //     );
      //     return booksByAuthorAndGenre;
      //   }
      // }

      // if (args.genre) {
      //   const booksByGenre = books.filter((book) =>
      //     book.genres.includes(args.genre)
      //   );
      //   return booksByGenre;
      // }

      return Book.find({});
    },

    allAuthors: () => Author.find({}),
  },
  // Author: {
  //   bookCount: (root) => {
  //     const booksByAuthor = books.filter((book) => book.author === root.name);
  //     return booksByAuthor.length;
  //   },
  // },
  Mutation: {
    addBook: async (root, args) => {
      const book = new Book({ ...args });
      try {
        await book.save();
      } catch (err) {
        throw new UserInputError(err.message);
      }
      return book;
    },
    // editAuthorBirth: (root, args) => {
    //   const authorToEdit = authors.find((author) => author.name === args.name);
    //   if (!authorToEdit) return null;
    //   const editedAuthor = { ...authorToEdit, born: args.setBornTo };
    //   authors = authors.map((author) =>
    //     author.name === editedAuthor.name ? editedAuthor : author
    //   );
    //   return editedAuthor;
    // },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

//MAKE EXAMPLES TO USE BUT MAKE SURE ADDRESS FIELD IS AS SHOULD BE AKA NOT A STRING.
