import React, { Component } from 'react'
import styled from 'styled-components'

import colors from '../../../styles/colors'


const Row = styled.div`
    display: flex;
    background-color: ${colors.darkWhite};
    padding: 1rem 1rem .5rem 2rem;
    font-size: 2rem;
    color: ${colors.gray};
`

const PageTitle = styled.h1`
    text-transform: uppercase;
`

// const PageSettingsButton = styled.div`
//     margin-left: .5rem;
//     font-size: 1rem;
//     align-self: flex-end;
// `

class BreadCrumbNav extends Component {
    render() {
        const { page } = this.props
        if (!page) return null;
        return (
            <Row>
                <PageTitle>{`${page.name}`}</PageTitle>
            </Row>
        )
    }
}
export default BreadCrumbNav