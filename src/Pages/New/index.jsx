import React, { Component } from 'react';
import styled from 'styled-components';

// Components
import SpaceList from '../../component/Workspace/SpaceList';
import DetailList from '../../component/Workspace/DetailList';
import SpeedDial from '../../component/SpeedDial/Container';
import ChromeTabArea from '../../component/ChromeTabArea';
import BreadCrumb from '../../component/BreadcrumbNav';
import NameInput from '../../component/Workspace/name.input';

class NewPage extends Component {
    constructor(props) {
        super(props)
        this.sitesHandler = this.sitesHandler.bind(this)
    }

    sitesHandler(action, payload) {
        // check if workspace is selected (should throw some visable error)
        if(!this.props.selectedWorkspace) return;
        const { site } = payload
        const { sites } = this.props.selectedWorkspace
        let updatedWorkspace = {
            ...this.props.selectedWorkspace,
            lastModified: Date.now()
        }
        switch(action.type) {
            case 'REMOVE_SITE_FROM_SELECTED_WORKSPACE':
                const index = sites.indexOf(site)
                updatedWorkspace.sites = [
                    ...sites.slice(0, index),
                    ...sites.slice(index+1)
                ]
                // Replace selectedWorkspace with updatedWorkspace
                this.props.workspaceHandler('REPLACE_WORKSPACE', { 
                    workspace: this.props.selectedWorkspace, 
                    updatedWorkspace
                })
                return;
            case 'ADD_SITE_TO_SELECTED_WORKSPACE':
                updatedWorkspace.sites = [
                    ...sites,
                    site,
                ]
                // Replace selectedWorkspace with updatedWorkspace
                this.props.workspaceHandler('REPLACE_WORKSPACE', { 
                    workspace: this.props.selectedWorkspace, 
                    updatedWorkspace
                })
                return;

            case 'REPLACE_SITE':
                return;
            default:
                return;
        }
    }

    render() {
        return (
            <Row>
                <MainArea>
                    <Header>
                        <BreadCrumb 
                            workspace={this.props.selectedWorkspace} 
                            workspaceHandler={this.props.workspaceHandler}
                        />
                        <RightCol>
                            <NameInput workspaceHandler={this.props.workspaceHandler}/>
                        </RightCol>
                    </Header>
                    <DetailList
                        sitesHandler={this.sitesHandler}
                        workspaceHandler={this.props.workspaceHandler}
                        selectedWorkspace={this.props.selectedWorkspace}
                    />
                    <SpaceList
                        workspaceHandler={this.props.workspaceHandler}
                        workspaces={this.props.workspaces}
                        display={this.props.selectedWorkspace === null}
                    />
                    <SpeedDial 
                        display={this.props.selectedWorkspace === null}
                    />
                </MainArea>
                <SideBar>
                    <ChromeTabArea sitesHandler={this.sitesHandler} selectedWorkspace={this.props.selectedWorkspace}/>
                </SideBar>
            </Row>
        )
    }
}
export default NewPage;

// styled
const MainArea = styled.div`
    width: calc(100vw - 500px);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Row = styled.div`
    display: flex;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    padding: 1rem;
    box-sizing: border-box;
`;

const SideBar = styled.div`
    display: flex;
    flex-direction: column;
`;

const RightCol = styled.div`
    margin-left: auto;
`;

