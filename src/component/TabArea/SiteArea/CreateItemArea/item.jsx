import React, {Component} from 'react'
import styled from 'styled-components'

// Styled
const Anchor = styled.a`
    display: flex;
    align-items: center;
`

const Icon = styled.img`
    height: 75px;
    width: 75px;
`

class Item extends Component {
    render() {
        let {name, url, img} = this.props
        return (
            <Anchor href={url} target={'_blank'} alt={name}>
                <Icon src={img} alt={name}/>
            </Anchor>
        )
    }
}
export default Item