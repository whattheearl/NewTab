import React, { Component } from 'react'
import styled from 'styled-components'

// Components
import SpaceList from '../../component/Workspace/SpaceList'
import DetailList from '../../component/Workspace/DetailList'
import SpeedDial from '../../component/SpeedDial/Container'
import ChromeTabArea from '../../component/ChromeTabArea'
import BreadCrumb from '../../component/BreadcrumbNav'
import NameInput from '../../component/Workspace/name.input'
import FavoriteButton from '../../component/Buttons/Favorite/Container'
import SettingsButton from '../../component/Buttons/Settings/Container'

// colors
import colors from '../../styles/colors'

class NewPage extends Component {
    render() {
        return (
            <Row>
                <MainArea>
                    <Header>
                        <BreadCrumb 
                            workspace={this.props.selectedWorkspace} 
                            workspaceHandler={this.props.workspaceHandler}
                        />
                        <FavoriteButton
                            selectedWorkspace={this.props.selectedWorkspace} 
                            workspaceHandler={this.props.workspaceHandler}
                        />
                        <SettingsButton
                            selectedWorkspace={this.props.selectedWorkspace} 
                            workspaceHandler={this.props.workspaceHandler}
                        />
                        <RightCol>
                            <NameInput workspaceHandler={this.props.workspaceHandler} />
                        </RightCol>
                    </Header>
                    <SpaceList
                        workspaceHandler={this.props.workspaceHandler}
                        workspaces={this.props.workspaces}
                        display={this.props.selectedWorkspace === null}
                    />
                    <DetailList
                        workspaceHandler={this.props.workspaceHandler}
                        selectedWorkspace={this.props.selectedWorkspace}
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

const Header = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    padding: 1rem;
    box-sizing: border-box;
`

const SideBar = styled.div`
    display: flex;
    flex-direction: column;
`

const RightCol = styled.div`
    margin-left: auto;
`

