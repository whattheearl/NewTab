import React, {Component} from 'react'
import styled from 'styled-components'

// Color
import colors from '../../styles/colors'

const Container = styled.div`
    color: #FFFD;
    width: 100%;
    padding-top: .33em;
    padding-bottom: .33em;
    font-size: 1rem;
    :hover {
        cursor: pointer;
    }
`

const Name = styled.h1`
    margin-left: 1rem;
`

class Page extends Component {
    render() {
        let style = null
        if(this.props.selected) style = {color: colors.black, backgroundColor: colors.babyBlue}
        return (
            <Container onClick={() => {this.props.select()}} style={style}>
                <Name>{this.props.name}</Name>
            </Container>
        )
    }
}

export default Page