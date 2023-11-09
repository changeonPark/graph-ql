import { ApolloServer, gql } from "apollo-server"

let tweets = [
  {
    id: "1",
    text: "Hello World!",
    userId: "1",
  },
  {
    id: "2",
    text: "Bye World!",
    userId: "5",
  },
]

let users = [
  {
    id: "1",
    firstName: "changeon",
    lastName: "Park",
  },
  {
    id: "2",
    firstName: "Elon",
    lastName: "Musk",
  },
]

// Scalar Type: Built in

const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    fullName: String!
  }
  """
  트윗 관련 타입
  """
  type Tweet {
    """
    아이디
    """
    id: ID!
    text: String!
    author: User
  }

  # GET
  type Query {
    allUsers: [User!]!
    allTweets: [Tweet!]!
    tweet(id: ID!): Tweet
  }

  # POST, PUT, DELETE
  type Mutation {
    postTweet(text: String!, userId: ID!): Tweet!
    """
    트윗을 찾으면 삭제 및 true 반환, 없으면 false 반환
    """
    deleteTweet(id: ID!): Boolean!
  }
`

const resolvers = {
  Query: {
    allUsers() {
      return users
    },
    allTweets() {
      return tweets
    },
    tweet(_, args) {
      const { id } = args
      console.log("id: ", id)
      return tweets.find((tweet) => tweet.id === id)
    },
  },
  Mutation: {
    postTweet(_, { text, userId }) {
      const user = users.find((user) => user.id === userId)

      if (!user) throw new Error("User not found")

      const newTweet = {
        id: tweets.length + 1,
        text,
        userId,
      }
      tweets.push(newTweet)
      return newTweet
    },
    deleteTweet(_, { id }) {
      console.log(typeof id)
      const tweet = tweets.find((tweet) => tweet.id === id)

      if (!tweet) return false

      tweets = tweets.filter((tweet) => tweet.id !== id)
      return true
    },
  },
  User: {
    fullName(parent, _, contextValue) {
      console.log(parent)
      console.log("contextValue: ", contextValue)
      const { firstName, lastName } = parent
      return `${firstName} ${lastName}`
    },
  },
  Tweet: {
    author({ userId }) {
      const result = users.find((user) => user.id === userId)
      console.log("result: ", result, userId)
      return result ? result : null
    },
  },
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
