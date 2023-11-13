/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core"
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never
}
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
}

export type Movie = {
  __typename?: "Movie"
  background_image?: Maybe<Scalars["String"]["output"]>
  background_image_original?: Maybe<Scalars["String"]["output"]>
  date_uploaded?: Maybe<Scalars["String"]["output"]>
  date_uploaded_unix?: Maybe<Scalars["Int"]["output"]>
  description_full?: Maybe<Scalars["String"]["output"]>
  genres?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>
  id?: Maybe<Scalars["Int"]["output"]>
  imdb_code?: Maybe<Scalars["String"]["output"]>
  isLiked: Scalars["Boolean"]["output"]
  language?: Maybe<Scalars["String"]["output"]>
  large_cover_image?: Maybe<Scalars["String"]["output"]>
  medium_cover_image?: Maybe<Scalars["String"]["output"]>
  mpa_rating?: Maybe<Scalars["String"]["output"]>
  rating?: Maybe<Scalars["Float"]["output"]>
  runtime?: Maybe<Scalars["Float"]["output"]>
  slug?: Maybe<Scalars["String"]["output"]>
  small_cover_image?: Maybe<Scalars["String"]["output"]>
  state?: Maybe<Scalars["String"]["output"]>
  summary?: Maybe<Scalars["String"]["output"]>
  synopsis?: Maybe<Scalars["String"]["output"]>
  title?: Maybe<Scalars["String"]["output"]>
  title_english?: Maybe<Scalars["String"]["output"]>
  title_long?: Maybe<Scalars["String"]["output"]>
  torrents?: Maybe<Array<Maybe<Torrents>>>
  url?: Maybe<Scalars["String"]["output"]>
  year?: Maybe<Scalars["Int"]["output"]>
  yt_trailer_code?: Maybe<Scalars["String"]["output"]>
}

export type Mutation = {
  __typename?: "Mutation"
  /** 트윗을 찾으면 삭제 및 true 반환, 없으면 false 반환 */
  deleteTweet: Scalars["Boolean"]["output"]
  postTweet: Tweet
}

export type MutationDeleteTweetArgs = {
  id: Scalars["ID"]["input"]
}

export type MutationPostTweetArgs = {
  text: Scalars["String"]["input"]
  userId: Scalars["ID"]["input"]
}

export type Query = {
  __typename?: "Query"
  allMovies: Array<Movie>
  allTweets: Array<Tweet>
  allUsers: Array<User>
  movie?: Maybe<Movie>
  tweet?: Maybe<Tweet>
}

export type QueryMovieArgs = {
  id: Scalars["String"]["input"]
}

export type QueryTweetArgs = {
  id: Scalars["ID"]["input"]
}

export type Torrents = {
  __typename?: "Torrents"
  audio_channels?: Maybe<Scalars["String"]["output"]>
  bit_depth?: Maybe<Scalars["String"]["output"]>
  date_uploaded?: Maybe<Scalars["String"]["output"]>
  date_uploaded_unix?: Maybe<Scalars["Int"]["output"]>
  hash?: Maybe<Scalars["String"]["output"]>
  is_repack?: Maybe<Scalars["String"]["output"]>
  peers?: Maybe<Scalars["Int"]["output"]>
  quality?: Maybe<Scalars["String"]["output"]>
  seeds?: Maybe<Scalars["Int"]["output"]>
  size?: Maybe<Scalars["String"]["output"]>
  size_bytes?: Maybe<Scalars["Int"]["output"]>
  type?: Maybe<Scalars["String"]["output"]>
  url?: Maybe<Scalars["String"]["output"]>
  video_codec?: Maybe<Scalars["String"]["output"]>
}

/** 트윗 관련 타입 */
export type Tweet = {
  __typename?: "Tweet"
  author?: Maybe<User>
  /** 아이디 */
  id: Scalars["ID"]["output"]
  text: Scalars["String"]["output"]
}

export type User = {
  __typename?: "User"
  firstName: Scalars["String"]["output"]
  fullName: Scalars["String"]["output"]
  id: Scalars["ID"]["output"]
  lastName: Scalars["String"]["output"]
}

export type GetMovieQueryVariables = Exact<{
  movieId: Scalars["String"]["input"]
}>

export type GetMovieQuery = {
  __typename?: "Query"
  movie?: {
    __typename?: "Movie"
    id?: number | null
    title?: string | null
    small_cover_image?: string | null
    isLiked: boolean
  } | null
}

export type MovieFragmentFragment = { __typename?: "Movie"; isLiked: boolean } & {
  " $fragmentName"?: "MovieFragmentFragment"
}

export type GetMoviesQueryVariables = Exact<{ [key: string]: never }>

export type GetMoviesQuery = {
  __typename?: "Query"
  allMovies: Array<{ __typename?: "Movie"; title?: string | null; id?: number | null }>
  allTweets: Array<{
    __typename?: "Tweet"
    id: string
    text: string
    author?: { __typename?: "User"; fullName: string } | null
  }>
}

export const MovieFragmentFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "MovieFragment" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Movie" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [{ kind: "Field", name: { kind: "Name", value: "isLiked" } }],
      },
    },
  ],
} as unknown as DocumentNode<MovieFragmentFragment, unknown>
export const GetMovieDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getMovie" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "movieId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "movie" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: { kind: "Variable", name: { kind: "Name", value: "movieId" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "small_cover_image" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "isLiked" },
                  directives: [{ kind: "Directive", name: { kind: "Name", value: "client" } }],
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetMovieQuery, GetMovieQueryVariables>
export const GetMoviesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getMovies" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "allMovies" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "allTweets" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "text" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "author" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [{ kind: "Field", name: { kind: "Name", value: "fullName" } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetMoviesQuery, GetMoviesQueryVariables>
