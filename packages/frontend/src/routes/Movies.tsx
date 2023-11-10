import { gql, useQuery } from "@apollo/client"
import { Link } from "react-router-dom"

const ALL_MOVIES = gql`
  {
    allMovies {
      title
      id
    }
    allTweets {
      id
      text
      author {
        fullName
      }
    }
  }
`

const Movies = () => {
  const { data, loading, error } = useQuery(ALL_MOVIES)

  if (loading) {
    return <h1> loading... </h1>
  }

  if (error) {
    return <h1>{error.message}</h1>
  }

  console.log(data)

  return (
    <>
      <h2>Movies</h2>
      <ul>
        {data?.allMovies.map((movie: any) => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
      <h2>Tweets</h2>
      <ul>
        {data?.allTweets.map((tweet: any) => (
          <li key={tweet.id}>
            {tweet.text} / {tweet.author.fullName}
          </li>
        ))}
      </ul>
    </>
  )
}

export default Movies
