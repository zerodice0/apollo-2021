import React from 'react'
import {useParams} from 'react-router-dom'
import {gql} from 'apollo-boost'
import {useQuery} from '@apollo/react-hooks'
import styled from 'styled-components'
import Movie from '../components/Movie'

const GET_MOVIE = gql`
  query movie($id: Int!) {
    movie(id: $id) {
      id
      title
      language
      medium_cover_image
      rating
      description_intro
      isLiked @client
    }
    suggestions(id: $id) {
      id
      medium_cover_image
    }
  }
`

const Container = styled.div`
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  color: white;
`

const Column = styled.div`
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
`

const Title = styled.h4`
  font-size: 35px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h6`
  font-size: 35px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 28px;
  width: 50%;
`;

const Poster = styled.div`
  width: 80%;
  height: 60%;
  background-color: transparent;
  background-image: url(${props => props.bg});
  background-size: cover;
  background-position: center center;
`;

const Movies = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 25px;
  width: 60%;
  position: relative;
`

const _detail = () => {
  const {id} = useParams()
  const {loading, data, error} = useQuery(GET_MOVIE, {
    variables: {id : Number.parseInt(id)}
  })

  if (error && error?.message) {console.warn(error?.message)}

  return (
    <Container>
      <Row>
        <Column>
          <Title>{ loading ? "Loading..." : `${data?.movie?.title ?? "Error"}${data?.movie?.isLiked ? "❤️" : ""}`}</Title>
          {
            data?.movie && <>
              <Subtitle>{data?.movie?.language}·{data?.movie?.rating}</Subtitle>
              <Description>{data?.movie?.description_intro}</Description>
            </>
          }
          {
            error?.message && <div>{error?.message}</div>
          }
          <Movies>
            {data?.suggestions?.map( s => (
              <Movie key={s.id} id={s.id} bg={s.medium_cover_image}/>
            ))}
          </Movies>
        </Column>

        <Poster bg={data?.movie?.medium_cover_image ?? ""}></Poster>
      </Row>

    </Container>
  )
}

export default _detail