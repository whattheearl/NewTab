import React, {Component} from 'react'
import styled from 'styled-components'

import Item from './item'
import colors from '../../../../styles/colors'
const ItemContainer = styled.div`
    display: flex;
    justify-content: space-around;
    border: 1px solid #bdbdbd;
    background-color: ${colors.darkBlue};
    border-radius: 4px;
    padding: .5rem 0;
`

const Container = styled.div`
    margin-bottom: 1rem;
    padding: 0 1rem;
`

class CreateItemArea extends Component {
    render() {
        return (
            <Container>
                <ItemContainer>
                    <Item 
                        name={'Doc'}
                        url={'https://docs.google.com/document/create'}
                        img={'https://www.gstatic.com/images/branding/product/2x/docs_48dp.png'}
                    />

                    <Item 
                        name={'Sheet'}
                        url={'https://docs.google.com/spreadsheets/create'}
                        img={'https://www.gstatic.com/images/branding/product/2x/sheets_48dp.png'}
                    />

                    <Item 
                        name={'Slide'}
                        url={'https://docs.google.com/presentation/create'}
                        img={'https://www.gstatic.com/images/branding/product/2x/slides_48dp.png'}
                    />
                </ItemContainer>
            </Container>
        )
    }
}

export default CreateItemArea