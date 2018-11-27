import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

// Actions
import { selectWorkspace, updateWorkspace } from '../../actions';

// Assets
import colors from '../../styles/colors';

// components
import DetailHeader from './DetailHeader';
import Site from '../listItem/Detail';
import VerticalScrollArea from '../container/VerticalScroll';

class Detail extends Component {
    // select the workspace in url
    selectWorkspaceFromParam = () => {
        const workspaces = this.props.workspace.filter(
            space => String(space.uuid) === (this.props.match.params.workspaceid)
        )
        if (workspaces.length !== 1) {
            return console.error('Cannot find workspace', this.props.match.params.workspaceid);
        }
        this.props.selectWorkspace(workspaces[0]);
        console.log()
        return workspaces[0];
    }

    remove = (e, site) => {
        e.preventDefault();
        e.stopPropagation();
        const sites = this.props.selectedWorkspace.sites.filter(s => s.url !== site.url);
        const workspace = {
            ...this.props.selectedWorkspace,
            sites
        }
        this.props.updateWorkspace(workspace);
        this.props.selectWorkspace(workspace);
    }

    componentDidUpdate() {
        // select the correct workspace if not selected already
        if (!this.props.selectedWorkspace || String(this.props.selectedWorkspace.uuid) !== String(this.props.match.params.workspaceid)) {
            this.selectWorkspaceFromParam();
        }
    }

    // should abstract this to HOC
    componentDidMount() {
        this.selectWorkspaceFromParam();
    }

    renderSiteList() {
        return this.props.selectedWorkspace.sites
            .filter((site) => // filter sites
                site.title.includes(this.props.searchFilter)
            )
            .sort((a, b) => { // sort by name
                return ('' + a.title).localeCompare(b.title);
            })
            .map((site) => { // create Site elements
                return (
                    <Site key={site.url} site={site} />
                );
            });
    }

    render() {
        if (!this.props.selectedWorkspace) return null;
        return (
            <Container>
                <SpaceContainer>
                    <DetailHeader />
                    <VerticalScrollArea className="VerticalScrollArea">
                        {this.renderSiteList()}
                    </VerticalScrollArea>
                </SpaceContainer>
            </Container>
        );
    }
}
function mapStateToProps(state) {
    return {
        workspace: state.workspace,
        selectedWorkspace: state.selectedWorkspace,
        searchFilter: state.searchFilter,
    };
}
export default connect(mapStateToProps, { updateWorkspace, selectWorkspace })(Detail);

const Container = styled.div`
    display: flex;
    flex-direction: column;
    max-height: calc(100vh - 64px);
    flex: 1;
    width: 100%;
    box-sizing: border-box;
`;

const SpaceContainer = styled.div`
    background-color: white;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    border-bottom: 1px solid ${colors.darkWhite};
    padding-bottom: .5rem;
    box-sizing: border-box;
    flex: 1;
`;