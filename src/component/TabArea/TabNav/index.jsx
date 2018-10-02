import React from 'react'
import styled from 'styled-components'

// Components
// import Logo from './Logo'
import Tab from './Tab'

// Colors
import colors from '../../../styles/colors'

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

const MainHeader = ({selectTab, tabs, selectedTab}) => {
    const tabsList = tabs.map(tab => {
        return (<div onClick={() => {
            console.log(this.props)
            console.log('onclick tab')
            selectTab(tab)}
        }><Tab key={tab.name} name={tab.name} self={tab} selected={tab === selectedTab}/></div>)
    })
    return(
        <HeaderContainer>
            <Row>
                <BorderBottomAreaLeft/>
                <Tabs>
                    {tabsList}   
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