import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

// Assets
import colors from '../../styles/colors';

// Components
import VerticalScrollArea from '../container/VerticalScroll';
import HomeButton from '../listItem/Home';
import WorkspaceButton from '../listItem/Nav';

// Nav panel allows user to navigate between favorite workspace and home
class NavPanel extends Component {
    // clears data
    clearCache() {
        console.log('clearing cache');
        window.localStorage.clear();
        window.location.reload();
    }

    // using workspaces as "pages" to sort work
    render() {
        if (!this.props.display) return null;
        // only show this area for manual testing
        const displayTempArea = process.env.NODE_ENV === 'development';
        // sort by date saved
        let spaces = this.props.workspaces.slice()
            .sort((a, b) => { return a.saved - b.saved })
            .map((space) => {
                return <WorkspaceButton
                    key={space.uuid}
                    name={space.name}
                    uuid={space.uuid}
                    selected={this.props.selectedWorkspace === space}
                />;
            })
        return (
            <Container>
                <HomeButton
                    display={true}
                    selected={this.props.selectedWorkspace === null}
                />
                <VerticalScrollArea>
                    {spaces}
                    {displayTempArea ?
                        <div style={{ marginTop: 'auto' }}>
                            <h1 style={{ color: 'white', marginTop: 'auto' }}>Temp Area</h1>
                            <button onClick={this.clearCache} style={{ padding: '.5rem' }}>
                                Load Starter Data
                            </button>
                        </div>
                        : null}
                </VerticalScrollArea>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        selectedWorkspace: state.selectedWorkspace,
    }
}

export default connect(mapStateToProps)(NavPanel);

const Container = styled.div`
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 100%;
    color: ${colors.black};
`;