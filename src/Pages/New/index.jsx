import React, { Component } from 'react'
import styled from 'styled-components'

// Components
import Workspaces from '../../component/Workspace'
import SpeedDial from '../../component/SpeedDial/Container'
import ChromeTabArea from '../../component/ChromeTabArea'

// colors
import colors from '../../styles/colors'

class NewPage extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log(this.props)
        return (
            <Row>
                <MainArea>
                    <Workspaces 
                        workspaceHandler={this.props.workspaceHandler}
                        workspaces={this.props.workspaces} 
                    />
                    <Container>
                        <SpeedDial />
                    </Container>
                </MainArea>
                <SideBar>
                    <ChromeTabArea />
                </SideBar>
            </Row>
        )
    }
}
export default NewPage

// styled
const MainArea = styled.div`
    width: calc(100vw - 500px);
    box-sizing: border-box;
    border-right: 1px solid ${colors.lightGray};
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Container = styled.div`
    max-width: 700px;
    width: calc(100vw - 500px);
`

const Row = styled.div`
    display: flex;
`

const SideBar = styled.div`
    display: flex;
    flex-direction: column;
`

