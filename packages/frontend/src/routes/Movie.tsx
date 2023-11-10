import { gql, useQuery } from "@apollo/client"
import { useParams } from "react-router-dom"

const GET_MOVIE = gql`
  query getMovie($movieId: String!) {
    movie(id: $movieId) {
      id
      title
      small_cover_image
      isLiked @client
    }
  }
`

const Movie = () => {
  const { id } = useParams()
  const {
    data,
    loading,
    client: { cache },
  } = useQuery(GET_MOVIE, {
    variables: {
      movieId: id,
    },
  })

  const onClick = () => {
    // https://github.com/apollographql/apollo-cache-persist
    cache.writeFragment({
      id: `Movie:${id}`,
      fragment: gql`
        fragment MovieFragment on Movie {
          # title
          isLiked
        }
      `,
      data: {
        // title: "Sex on the Beach",
        isLiked: !data.movie.isLiked,
      },
    })
  }

  if (loading) return <h1>Loading...</h1>

  return (
    <div>
      <div>{data.movie.title}</div>
      <button onClick={onClick}>{data.movie.isLiked ? "Unlike" : "Like"}</button>
    </div>
  )
}

export default Movie
