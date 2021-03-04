import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const TOGGLE_LIKE_MOVIE = gql`
  mutation toggleLikeMovie($id: Int!, $isLiked: Boolean!) {
    toggleLikeMovie(id: $id, isLiked: $isLiked) @client
  }
`

const Container = styled.div`
  height: 380px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

`
const Poster = styled.div`
  background-image: url(${props => props.bg});
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center center;
  border-radius: 4px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16),
    0 3px 6px rgba(0, 0, 0, 0.23);
`

const Button = styled.button`
  align-self: center;
  color: tomato;
`

const SLink = styled(Link)`
  display:flexbox;
  width: 100%;
  height:100%;
`

const _movie = ({id, bg, isLiked}) => {
  const [toggleLikeMovie] = useMutation(TOGGLE_LIKE_MOVIE, {
    variables: {id: parseInt(id), isLiked: isLiked}
  })

  return(
    <Container>
      <SLink to={`/${id}`}>
        <Poster bg={bg}>
        </Poster>
      </SLink>
      <Button onClick={toggleLikeMovie}>{isLiked ? "Unlike" : "like"}</Button>
    </Container>
  )
}

export default _movie