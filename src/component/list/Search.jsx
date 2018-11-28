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
    // ensure to unselect workspace <- this should be done for every home route move to parent
    componentDidUpdate() {
        if (!!this.props.selectedWorkspace) {
            this.props.unselectWorkspace();
        }
    }

    // ensure to unselect workspace
    componentDidMount() {
        if (!!this.props.selectedWorkspace) {
            this.props.unselectWorkspace();
        }
    }

    componentWillUpdate(nextProps) {
        return nextProps.workspace !== this.props.workspace
            || nextProps.searchFilter !== this.props.searchFilter;
    }

    renderSearch() {
        // get all sites that match search
        let sites = this.props.workspace
            .map(space => space.sites)
            .flat()
            .filter(site => {
                return (
                    site.url.toLowerCase().includes(this.props.searchFilter.toLowerCase()) ||
                    site.title.toLowerCase().includes(this.props.searchFilter.toLowerCase())
                )
            })
            .sort((a, b) => ('' + a.title).localeCompare(b.title))
            .map((site) => <Site key={site.uuid} site={site} />)

        // get all workspaces whose name matches
        let spaces = this.props.workspace
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

        // return both
        return spaces.concat(sites);
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