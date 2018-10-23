import React, { Component } from 'react'
import styled from 'styled-components'

// Components
import ChromeTabArea from '../../component/ChromeTabArea'

// colors
import colors from '../../styles/colors'


class WorkspacePage extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Row>
                <MainArea>
                    
                </MainArea>
                <SideBar>
                    <ChromeTabArea />
                </SideBar>
            </Row>
        )
    }
}
export default WorkspacePage

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

