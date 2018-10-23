import React, {Component} from 'react'
import styled from 'styled-components'

// Components
import Tab from './Tab'
import NewTabButton from './NewTabButton'
import EditTabsButton from './EditTabsButton'

// Colors
import colors from '../../../styles/colors'

// Styles
const HeaderContainer = styled.div`
    background-color: ${colors.darkWhite};
    height: 2.25rem;
    width: calc(100vw - 200px);
`
const Row = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
`

const Tabs = styled.div`
    display: flex;
    align-items: flex-end;
    overflow-x: auto;
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

class MainHeader extends Component {
    constructor() {
        super()
        this.state = {
            tabsEditable: false,
        }
    }

    toggleEdit() {
        this.setState({tabsEditable: !this.state.tabsEditable})
    }

    renderTabs() {
        let {selectedTab, selectTab, tabs} = this.props
        const tabsList = tabs.map((tab, index) => {
            return (
                <div key={index} onClick={() => {selectTab(tab)}}>
                    <Tab 
                        name={tab.name} 
                        self={tab} 
                        selected={tab === selectedTab}
                        editable={this.state.tabsEditable}
                        remove={(e) => {this.props.removeTab(e, index)}}
                    />
                </div>
            )
        })
        return tabsList
    }
    
    render() {
        let {addTab} = this.props
        return(
            <HeaderContainer>
                <Row>
                    <BorderBottomAreaLeft/>
                    <Tabs>
                        {this.renderTabs()}   
                    </Tabs>
                    <NewTabButton addTab={addTab}/>
                    <BorderBottomAreaRight/>
                    <EditTabsButton toggleEdit={this.toggleEdit.bind(this)}/>
                </Row>
            </HeaderContainer>
        )
    }
}

export default MainHeader