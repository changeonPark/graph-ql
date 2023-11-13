import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import fetch from "node-fetch"
import { loadFilesSync } from "@graphql-tools/load-files"
import { mergeTypeDefs } from "@graphql-tools/merge"

let tweets = [
  {
    id: "1",
    text: "Hello World!",
    userId: "1",
  },
  {
    id: "2",
    text: "Bye World!",
    userId: "2",
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

const loadFiles = loadFilesSync("./graphql/*.graphql")
const typeDefs = mergeTypeDefs(loadFiles)

const resolvers = {
  Query: {
    async allMovies() {
      const response = await fetch("https://yts.mx/api/v2/list_movies.json")

      console.log(response.status)
      const result = await response.json()

      return result.data.movies
    },
    async movie(_, args) {
      const { id } = args
      const response = await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)

      const result = await response.json()

      console.log('movie called')

      return result.data.movie
    },
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

const url = await startStandaloneServer(server, { listen: { port: 4000 } })

console.log(`🚀 Server ready at: ${url.url}`)
