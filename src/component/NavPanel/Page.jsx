import React, {Component} from 'react'
import { Link } from 'react-router-dom'
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

`

class Page extends Component {
    renderPageName() {
        const {name} = this.props
        if(!name) return null
        if(name.length > 19) {
            return `${name.slice(0, 19)}...`
        }
        return name
    }
    render() {
        let style = null
        if(this.props.selected) style = {color: colors.black, backgroundColor: colors.babyBlue}
        return (
            <Link to={`/${this.props.name}`} style={{textDecoration: 'none'}}>
                <Container onClick={this.props.select} style={style}>
                    <Name>{this.renderPageName()}</Name>
                </Container>
            </Link>
        )
    }
}

export default Page