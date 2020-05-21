const { ApolloServer, UserInputError, AuthenticationError, PubSub, gql } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const Book = require('./models/Book')
const Author = require('./models/Author')
const User = require('./models/User')

const pubsub = new PubSub()

const JWT_SECRET = 'LONDON_BRIDGE'
const PASSWORD = 'defaultpassword'

mongoose.set('useFindAndModify', false)
const MONGODB_URI = 'mongodb+srv://harry:Ngocminh2005@@fullstack2020-epr9k.mongodb.net/library?retryWrites=true&w=majority'

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]
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
    me: User
    authorCount: Int!
    bookCount: Int!
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
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  }    
`

const resolvers = {
  Query: {
    me: (root, args, context) => {
      return context.currentUser
    },
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.genre && !args.author) {
        return Book.find({})
      } else if (args.genre && !args.author) {
        return Book.find({genres: { $in: args.genre }})
      } else if (!args.genre && args.author) {
        return Book.find({author: args.author})
      } else {
        return Book.find({author: args.author, genres: { $in: args.genre }})
      }
    },
    allAuthors: () => Author.find({}).populate('books'),
  },

  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      let authorObj = await Author.findOne({name: args.author})
      if (!authorObj) {
        authorObj = new Author({name: args.author})
        try {
          await authorObj.save()
        } catch(e) {
          throw new UserInputError(e.message, {
            invalidArgs: args,
          })
          console.log(e);
        }
      }

      const book = new Book({ ...args, author: authorObj._id })
      try {
        await book.save()
        await Author.findByIdAndUpdate(authorObj._id, {$push: {books: book}})
      } catch(e) {
        throw new UserInputError(e.message, {
          invalidArgs: args,
        })
        console.log(e);
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      const targetAuthor = await Author.findOne({name: args.name})
      if (targetAuthor) {
        targetAuthor.born = args.setBornTo
        try {
          await targetAuthor.save()
        } catch(e) {
          throw new UserInputError(e.message, {
            invalidArgs: args,
          })
          console.log(e);
        }
        return targetAuthor
      } else {
        return null
      }
    },
    createUser: async (root, args) => {
      console.log(args)
      const user = new User({ ...args })

      try {
        await user.save()
      } catch(e) {
        throw new UserInputError(e.message, {
          invalidArgs: args,
        })
        console.log(e);
      }

      return user
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== PASSWORD ) {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  },

  Author: {
    bookCount: (root) => {
      return root.books.length
    }
  },

  Book: {
    author: async (root) => {
      const existingAuthor = await Author.findById(root.author)
      return existingAuthor
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})