import React from 'react'
import styled from 'styled-components'

// Styled
const LinkContainer = styled.a`
  color: inherit;
  text-decoration: none;
  font-size: 2rem;
`

const Name = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #4e4e4e;
  text-transform: capitalize;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`

const Thumb = styled.img`
  width: 100px;
  height: 100px;
  margin: 15px;
  margin-bottom: 15px;
  border-radius: 15px;
  object-fit: cover;
  border: 1px solid #2e2e2e17;
`

const NormalLink = (props) => {
    const {url, alt, image, name} = props
    return (
        <LinkContainer href={url} alt={alt} >
            <Column>
                <Thumb src={image} alt={alt}/>
                <Name>{name}</Name>
            </Column>
        </LinkContainer>
    )
}

export default NormalLink