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

// Contains the GraphQL schema
const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    bookCount: Int!
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
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }
  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }
  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: AuthorInput!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`;

// Resolvers define how GraphQL queries are responded to
const resolvers = {
  Query: {
    // Correspond to the queries described in the schema
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author) {
        const foundAuthor = await Author.findOne({ name: args.author });
        if (foundAuthor) {
          if (args.genre) {
            return await Book.find({
              author: foundAuthor.id,
              genres: { $in: [args.genre] },
            }).populate('author');
          }
          return await Book.find({ author: foundAuthor.id }).populate('author');
        }
        return null;
      }

      if (args.genre) {
        return Book.find({ genres: { $in: [args.genre] } }).populate('author');
      }

      return Book.find({}).populate('author');
    },
    allAuthors: async () => await Author.find({}),
    me: (root, args, context) => {
      return context.currentUser;
    },
  },

  Author: {
    bookCount: async (root) => {
      console.log(root);
      const foundAuthor = await Author.findOne({ name: root.name });
      const foundBooks = await Book.find({ author: foundAuthor.id });
      return foundBooks.length;
    },
  },

  // In GraphQL, all operations which cause a change are done with mutations.
  Mutation: {
    addBook: async (root, args, context) => {
      const foundBook = await Book.findOne({ title: args.title });
      const foundAuthor = await Author.findOne({ name: args.author.name });
      const currentUser = context.currentUser;

      // if (!currentUser) {
      //   throw new AuthenticationError('not authenticated');
      // }

      if (foundBook) {
        throw new UserInputError('Book already exists', {
          invalidArgs: args.title,
        });
      }

      if (!foundAuthor) {
        const author = new Author({ ...args.author });
        try {
          await author.save();
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        }
      }

      const foundAuthor2 = await Author.findOne({ name: args.author.name });
      const book = new Book({ ...args, author: foundAuthor2 });

      try {
        await book.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      return book;
    },
    editAuthor: async (root, args, context) => {
      const author = await Author.findOne({ name: args.name });
      const currentUser = context.currentUser;

      // if (!currentUser) {
      //   throw new AuthenticationError('not authenticated');
      // }

      if (!author) {
        return null;
      }

      const filter = { name: args.name };
      const options = {};
      const updateDoc = {
        $set: {
          ...author,
          born: args.setBornTo,
        },
      };

      await Author.updateOne(filter, updateDoc, options);
      return await Author.findOne({ name: args.name });
    },
    // createUser: (root, args) => {
    //   const user = new User({
    //     username: args.username,
    //     favoriteGenre: args.favoriteGenre,
    //   });

    //   return user.save().catch((error) => {
    //     throw new UserInputError(error.message, {
    //       invalidArgs: args,
    //     });
    //   });
    // },
    // login: async (root, args) => {
    //   const user = await User.findOne({ username: args.username });

    //   if (!user || args.password !== PASSWORD) {
    //     throw new UserInputError('wrong credentials');
    //   }

    //   const userForToken = {
    //     username: user.username,
    //     id: user._id,
    //   };

    //   return { value: jwt.sign(userForToken, JWT_SECRET) };
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
