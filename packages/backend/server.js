import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import fetch from "node-fetch"

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

const typeDefs = `#graphql
  type Torrents {
    url: String
    hash: String
    quality: String
    type: String
    is_repack: String
    video_codec: String
    bit_depth: String
    audio_channels: String
    seeds: Int
    peers: Int
    size: String
    size_bytes: Int
    date_uploaded: String
    date_uploaded_unix: Int
  }

  type Movie {
    id: Int
    url: String
    imdb_code: String
    title: String
    title_english: String
    title_long: String
    slug: String
    year: Int
    rating: Float
    runtime: Float
    summary: String
    description_full: String
    synopsis: String
    yt_trailer_code: String
    language: String
    mpa_rating: String
    background_image: String
    background_image_original: String
    small_cover_image: String
    medium_cover_image: String
    large_cover_image: String
    state: String
    date_uploaded: String
    date_uploaded_unix: Int
    torrents: [Torrents]
    genres: [String]
  }

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
    allMovies: [Movie!]!
    allUsers: [User!]!
    allTweets: [Tweet!]!
    tweet(id: ID!): Tweet
    movie(id: String!): Movie
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
