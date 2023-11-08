import { ApolloServer, gql } from "apollo-server"

// Scalar Type: Built in

const typeDefs = gql`
  type Query {
    allTweets: 
  }
`

const server = new ApolloServer({ typeDefs })

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
