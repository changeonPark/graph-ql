import { gql, useApolloClient } from "@apollo/client"
import { useEffect, useState } from "react"

const Movies = () => {
  const [movies, setMovies] = useState([])
  const client = useApolloClient()

  useEffect(() => {
    client
      .query({
        query: gql`
          {
            allMovies {
              title
            }
          }
        `,
      })
      .then((result) => setMovies(result.data.allMovies))
  }, [client])

  return (
    <div>
      {movies.map((movie: any) => (
        <li key={movie.title}>{movie.title}</li>
      ))}
    </div>
  )
}

export default Movies
