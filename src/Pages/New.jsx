import React, { Component } from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';

// Components
import SpaceList from '../component/Workspace/SpaceList';
import DetailList from '../component/Workspace/DetailList';
import SpeedDial from '../component/SpeedDial/Container';
import ChromeTabArea from '../component/ChromeTabArea';
import BreadCrumb from '../component/BreadcrumbNav';
import NameInput from '../component/Workspace/name.input';
import NavPanel from '../component/NavPanel';

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
            <div className="newpage">
                <Header>
                    <BreadCrumb 
                        workspace={this.props.selectedWorkspace} 
                        workspaceHandler={this.props.workspaceHandler}
                    />
                    <div>&nbsp;</div>
                </Header>
                <Row>
                    <LeftCol>
                        <NavPanel 
                            display={ true } 
                            workspaces={ this.props.workspaces.filter(space => !!space.saved) } 
                            selectedWorkspace={ this.props.selectedWorkspace }
                            workspaceHandler={ this.props.workspaceHandler }
                        /> 
                    </LeftCol>
                    <MainArea>
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
                        {/* <SpeedDial 
                            display={this.props.selectedWorkspace === null}
                        /> */}
                    </MainArea>
                    <RightCol>
                        <NameInput workspaceHandler={this.props.workspaceHandler}/>
                        <ChromeTabArea sitesHandler={this.sitesHandler} selectedWorkspace={this.props.selectedWorkspace}/>
                    </RightCol>
                </Row>
            </div>
        )
    }
}
export default NewPage;

// styled
const MainArea = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
`;

const Row = styled.div`
    height: calc(100vh - 64px);
    display: flex;
    width: 100vw;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100vw;
    padding: 1rem;
    border-bottom: 1px solid ${colors.darkWhite};
    box-sizing: border-box;
`;

const RightCol = styled.div`
    padding: 2rem;
    display: flex;
    flex-direction: column;
`;

const LeftCol = styled.div`
    display: flex;
    flex-direction: column;
    width: 220px;
`

