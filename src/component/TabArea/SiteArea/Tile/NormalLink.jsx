import React, {Component} from 'react'
import styled from 'styled-components'

// Colors
import colors from '../../../../styles/colors'

// Styled
const LinkContainer = styled.a`
  color: inherit;
  text-decoration: none;
  font-size: 2rem;
  background-color: ${colors.white};
`

const Name = styled.h2`
  text-align: center;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #4e4e4e;
  text-transform: capitalize;
  width: calc(calc(100vw - 540px)/5);
  /* overflow: hidden; */
  /* white-space: pre-line; */
  /* word-wrap: break-word; */
  padding: 0 .5rem;
  box-sizing: border-box;
  /* height: 2em; */
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

class NormalLink extends Component {
  renderName() {
    if(this.props.name.length <= 30) return this.props.name
    return `${this.props.name.slice(0, 30)}...`
  }
  render() {
    let {url, alt, image, name, icons} = this.props
    if(icons && icons.length > 0) {
      image = icons[0]
    }
    return (
        <LinkContainer target={'_blank'} href={url} alt={alt} >
            <Column>
                <Thumb src={image} alt={alt}/>
                <Name>{this.renderName()}</Name>
            </Column>
        </LinkContainer>
    )
  }
}

export default NormalLink