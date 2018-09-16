import React, { Component } from 'react'
import styled from 'styled-components'

const Link = styled.a`
  width: 100%;
  height: 100%;
`

const Thumb = styled.img`
  width: 100%;
  height: 100%;
`

const LinkTile = ({uri, image, alt}) => {
    if(!alt) alt = uri
    return (
      <div className="link-tile">
        <Link href={uri} alt={alt} >
            <Thumb src={image} alt={alt}/>
        </Link>
      </div>
    );
}

export default LinkTile
