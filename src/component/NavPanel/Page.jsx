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
    renderPageName() {
        const {name} = this.props
        if(!name) return null
        if(name.length > 22) {
            return `${name.slice(0, 22)}...`
        }
        return name
    }
    render() {
        let style = null
        if(this.props.selected) style = {color: colors.black, backgroundColor: colors.babyBlue}
        return (
            <Container onClick={this.props.select} style={style}>
                <Name>{this.renderPageName()}</Name>
            </Container>
        )
    }
}

export default Page