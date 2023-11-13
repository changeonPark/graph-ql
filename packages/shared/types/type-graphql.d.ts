export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Movie = {
  __typename?: 'Movie';
  background_image?: Maybe<Scalars['String']['output']>;
  background_image_original?: Maybe<Scalars['String']['output']>;
  date_uploaded?: Maybe<Scalars['String']['output']>;
  date_uploaded_unix?: Maybe<Scalars['Int']['output']>;
  description_full?: Maybe<Scalars['String']['output']>;
  genres?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  id?: Maybe<Scalars['Int']['output']>;
  imdb_code?: Maybe<Scalars['String']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  large_cover_image?: Maybe<Scalars['String']['output']>;
  medium_cover_image?: Maybe<Scalars['String']['output']>;
  mpa_rating?: Maybe<Scalars['String']['output']>;
  rating?: Maybe<Scalars['Float']['output']>;
  runtime?: Maybe<Scalars['Float']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  small_cover_image?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  summary?: Maybe<Scalars['String']['output']>;
  synopsis?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  title_english?: Maybe<Scalars['String']['output']>;
  title_long?: Maybe<Scalars['String']['output']>;
  torrents?: Maybe<Array<Maybe<Torrents>>>;
  url?: Maybe<Scalars['String']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
  yt_trailer_code?: Maybe<Scalars['String']['output']>;
};

export type Torrents = {
  __typename?: 'Torrents';
  audio_channels?: Maybe<Scalars['String']['output']>;
  bit_depth?: Maybe<Scalars['String']['output']>;
  date_uploaded?: Maybe<Scalars['String']['output']>;
  date_uploaded_unix?: Maybe<Scalars['Int']['output']>;
  hash?: Maybe<Scalars['String']['output']>;
  is_repack?: Maybe<Scalars['String']['output']>;
  peers?: Maybe<Scalars['Int']['output']>;
  quality?: Maybe<Scalars['String']['output']>;
  seeds?: Maybe<Scalars['Int']['output']>;
  size?: Maybe<Scalars['String']['output']>;
  size_bytes?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  video_codec?: Maybe<Scalars['String']['output']>;
};

/** 트윗 관련 타입 */
export type Tweet = {
  __typename?: 'Tweet';
  author?: Maybe<User>;
  /** 아이디 */
  id: Scalars['ID']['output'];
  text: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  firstName: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
};
