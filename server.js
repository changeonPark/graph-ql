import { ApolloServer, gql } from "apollo-server"

const tweets = [
  {
    id: "1",
    text: "Hello World!",
  },
  {
    id: "2",
    text: "Bye World!",
  },
]

// Scalar Type: Built in

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
  }
  type Tweet {
    id: ID!
    text: String!
    author: User
  }

  # GET
  type Query {
    allTweets: [Tweet!]!
    tweet(id: ID!): Tweet
  }

  # POST, PUT, DELETE
  type Mutation {
    postTweet(text: String!, userId: ID!): Tweet!
    deleteTweet(id: ID!): Boolean!
  }
`

const resolvers = {
  Query: {
    allTweets() {
      return tweets
    },
    tweet(root, args) {
      const { id } = args
      console.log(args)
      console.log("id: ", id)
      return tweets.find((tweet) => tweet.id === id)
    },
  },
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
