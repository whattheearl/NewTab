import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

// Actions
import { selectWorkspace, addWorkspace } from '../../actions';

// Assets
import colors from '../../styles/colors';

// components
import DetailHeader from './DetailHeader';
import Site from '../listItem/Detail';
import VerticalScrollArea from '../container/VerticalScroll';

// Renders the sites of a workspace as a list
class DetailList extends Component {
    // select the workspace in url
    selectWorkspaceFromParam = () => {
        let workspace = this.props.workspace[this.props.match.params.workspaceid];
        if (!!workspace) {
            fetch(`http://localhost:8000/workspace/${this.props.match.params.workspaceid}`)
                .then((res) => {
                    return res.json()
                })
                .then((res) => {
                    console.log('adding', res);
                    this.props.addWorkspace(res);
                    this.props.selectWorkspace(res);
                    return;
                }).catch((err) => {
                    return console.error('Cannot find workspace', this.props.match.params.workspaceid);
                })
        }
        this.props.selectWorkspace(this.props.workspace[this.props.match.params.workspaceid]);
    }

    // Rerender there are changes to workspacestate
    componentWillUpdate(nextProps) {
        return nextProps.workspace !== this.props.workspace;
    }

    componentDidUpdate() {
        this.selectWorkspaceFromParam();
    }

    // should abstract this to HOC
    componentDidMount() {
        this.selectWorkspaceFromParam();
    }

    renderSiteList() {
        console.log(this.props.selectedWorkspace);
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
export default connect(mapStateToProps, { selectWorkspace, addWorkspace })(DetailList);

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