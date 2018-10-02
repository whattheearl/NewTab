import React from 'react'
import styled from 'styled-components'

// Components
// import Logo from './Logo'
import Tab from './TabArea/Tab'

// Colors
import colors from '../../styles/colors'

// Styles
const HeaderContainer = styled.div`
    background-color: ${colors.darkWhite};
    height: 3.5rem;
`
const Row = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
`

const Button = styled.button`
    background-color: none;
    color: ${colors.gray};
    margin-left: auto;
`

const Tabs = styled.div`
    display: flex;
    align-items: flex-end;
    height: 100%;
`

const BorderBottomAreaLeft = styled.div`
    box-sizing: border-box;
    display: flex;
    align-items: flex-end;
    height: 100%;
    width: 2rem;
    border-bottom: 1px solid ${colors.lightGray};
`

const BorderBottomAreaRight = styled.div`
    box-sizing: border-box;
    display: flex;
    align-items: flex-end;
    height: 100%;
    flex-grow: 1;
    border-bottom: 1px solid ${colors.lightGray};
`

const MainHeader = (props) => {
    return(
        <HeaderContainer>
            <Row>
                <BorderBottomAreaLeft/>
                <Tabs>
                    <Tab name={'Main'} selected={true}>{'Main'}</Tab>
                    <Tab name={'IT'}/>
                    <Tab name={'Resources'}/>
                </Tabs>
                {/* <Button onClick={props.toggleSettingsPanel}>
                    {'Settings'}
                </Button> */}
                <BorderBottomAreaRight/>
            </Row>
        </HeaderContainer>
    )
}

export default MainHeader