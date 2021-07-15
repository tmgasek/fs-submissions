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
  input AuthorInput {
    name: String!
    born: Int
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
      author: AuthorInput!
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
    allAuthors: () => Author.find({}),
    allBooks: async (root, args) => {
      // if (args.author) {
      //   let booksByAuthor = books.filter((book) => book.author === args.author);
      //   if (args.genre) {
      //     const booksByAuthorAndGenre = booksByAuthor.filter((book) =>
      //       book.genres.includes(args.genre)
      //     );
      //     return booksByAuthorAndGenre;
      //   }
      // }

      if (args.genre) {
        const booksByGenre = await Book.find({
          genres: { $in: args.genre },
        }).populate('author');
        return booksByGenre;
      }

      return Book.find({}).populate('author');
    },
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({ author: root._id });
      return books.length;
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      const existingAuthor = await Author.findOne({ name: args.author.name });

      if (!existingAuthor) {
        const author = new Author({ ...args.author });
        try {
          await author.save();
        } catch (err) {
          throw new UserInputError(err.message, {
            invalidArgs: args,
          });
        }
      }

      const author = await Author.findOne({ name: args.author.name });
      const book = new Book({ ...args, author });

      try {
        await book.save();
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args,
        });
      }
      return book;
    },
    editAuthorBirth: async (root, args) => {
      return Author.findOneAndUpdate(
        { name: args.name },
        { born: args.setBornTo },
        { new: true }
      );
    },
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
