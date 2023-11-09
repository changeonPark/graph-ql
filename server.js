import { ApolloServer, gql } from "apollo-server"

// Scalar Type: Built in

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
  }
  type Tweet {
    id: ID!
    text: String!
    author: User!
  }

  # GET
  type Query {
    allTweets: [Tweet!]!
    tweet(id: ID!): Tweet!
  }

  # POST, PUT, DELETE
  type Mutation {
    postTweet(text: String!, userId: ID!): Tweet!
    deleteTweet(id: ID!): Boolean!
  }
`

const server = new ApolloServer({ typeDefs })

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
