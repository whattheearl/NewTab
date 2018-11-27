import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

// Actions
import { unselectWorkspace } from '../../actions';

// Assets
import colors from '../../styles/colors';

// Components
import Space from '../listItem/Space/Container';
import Site from '../listItem/Detail';
import VerticalScrollArea from '../container/VerticalScroll';
import Header from './DetailHeader';

class SearchList extends Component {
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

    // ensure to unselect workspace <- this should be done for every home route move to parent
    componentDidUpdate() {
        if (!!this.props.selectedWorkspace) {
            this.unselectWorkspace();
        }
    }

    // ensure to unselect workspace
    componentDidMount() {
        if (!!this.props.selectedWorkspace) {
            this.unselectWorkspace();
        }
    }


    renderSearch() {
        const { selectedWorkspace } = this.props;
        if (this.props.type === 'sites') {
            if (!this.selectedWorkspace) return null;
            let sites = selectedWorkspace.sites
                .filter(site => {
                    return (
                        site.url.toLowerCase().includes(this.props.searchFilter.toLowerCase()) ||
                        site.title.toLowerCase().includes(this.props.searchFilter.toLowerCase())
                    )
                })
                .sort((a, b) => ('' + a.title).localeCompare(b.title))
                .map((site, index) => <Site key={`site_${index}`} site={site} />)
            return sites;
        }

        const { workspace } = this.props;
        // get all sites that match search
        let sites = workspace
            .reduce((accumulater, space) => { return accumulater.concat(space.sites) }, [])
            .filter(site => {
                return (
                    site.url.toLowerCase().includes(this.props.searchFilter.toLowerCase()) ||
                    site.title.toLowerCase().includes(this.props.searchFilter.toLowerCase())
                )
            })
            .sort((a, b) => ('' + a.title).localeCompare(b.title))
            .map((site, index) => <Site key={`site_${index}`} site={site} />)
        // get all workspaces whose name matches

        let spaces = workspace.slice()
            .filter(space => {
                return space.name.toLowerCase().includes(this.props.searchFilter.toLowerCase())
            })
            .sort((a, b) => ('' + a.name).localeCompare(b.name)) // need to select which sor to use
            .map((space) =>
                (<Space
                    {...this.props}
                    key={space.uuid}
                    workspace={space}
                />)
            );
        let both = spaces.concat(sites);
        return both;

    }

    render() {
        console.log('searc', this.props);
        const { workspace, display } = this.props;
        if (!workspace || display === false) return null;
        return (
            <Container className="SearchList">
                <Header className="Header" />
                <VerticalScrollArea className="VerticalScrollArea">
                    {this.renderSearch()}
                </VerticalScrollArea>
            </Container>
        );
    }
}
// Redux State
const mapStateToProps = state => {
    return {
        workspace: state.workspace,
        selectedWorkspace: state.selectedWorkspace,
        searchFilter: state.searchFilter
    };
};

export default connect(mapStateToProps, { unselectWorkspace })(SearchList);

// Styled components
const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    border-bottom: 1px solid ${colors.darkWhite};
    box-sizing: border-box;
`;

const InfoContainer = styled.div`
    margin-bottom: auto;
    text-align: center;
`;