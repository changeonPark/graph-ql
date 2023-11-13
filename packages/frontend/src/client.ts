import { ApolloClient, InMemoryCache } from "@apollo/client"

// TODO: InmemoryCache가 뭔지 알아보기
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
})

export default client
