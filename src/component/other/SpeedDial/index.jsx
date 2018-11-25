// LinkPage
// Displays all links as tiles
import React, {Component} from 'react'
import styled from 'styled-components'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

// Component
import Tile from '../Tiles/EditableLink'
import NewLink from '../Tiles/NewLink'
import NewSiteModal from '../Modal/NewSite'
import EditSiteModal from '../Modal/EditSite'

// Colors
import colors from '../../styles/colors'

class SpeedDial extends Component {
    constructor(props) {
        super(props)

        this.state = {
            displayNewSiteModal: false,
            displayEditSiteModal: false,
            selectedSite: null,
        }
    }

    // selects site while edit is enabled
    selectSite(site) {
        this.setState({ 
            selectedSite: site,
            displayEditSiteModal: true
        })
    }

    // removes source then inserts it at target
    moveSite(sourceIndex, targetIndex) {
        // do nothing if source == target
        if(sourceIndex === targetIndex) return
        const updatedSites = this.props.sites.slice()
        // remove
        updatedSites.splice(sourceIndex, 1)
        // insert
        updatedSites.splice(targetIndex, 0, this.props.sites[sourceIndex])
        this.props.updateSites(updatedSites)
    }

    openEditSiteModal() {
        this.setState({displayEditSiteModal: true})
    }

    openNewSiteModal() {
        this.setState({displayNewSiteModal: true})
    }
    
    closeModals() {
        this.setState({
            displayNewSiteModal: false,
            displayEditSiteModal: false,
            selectedSite: null,
        })
    }


    // return list of linkTiles to render
    renderLinkTiles() {
        let links = this.props.sites.map((site, index) => {
            return <Tile 
                key={index} 
                site={site}
                index={index}
                alt={site.name} 
                name={site.name}
                url={site.url} 
                image={site.image}
                handler={this.props.handler}
                select={() => this.selectSite(site)}
            />
        })

        if(links.length < 10) {
            links.push(<NewLink 
                key={links.length}
                index={links.length}
                name={'Add Shortcut'}
                select={this.openNewSiteModal.bind(this)}
            />)
        }
        return links
    }

    render() {
        return (
            <Container>
                <Area>
                    <NewSiteModal 
                        displaySelf={this.state.displayNewSiteModal}
                        closeModal={this.closeModals.bind(this)}
                        handler={this.props.handler}
                    />
                    <EditSiteModal 
                        displaySelf={this.state.displayEditSiteModal}
                        closeModal={this.closeModals.bind(this)}
                        site={this.state.selectedSite}
                        handler={this.props.handler}
                    />
                    <Grid>
                        {this.renderLinkTiles()}
                    </Grid>
                </Area>
            </Container>
        )
    }
}
export default DragDropContext(HTML5Backend)(SpeedDial)

// Styled
const Area = styled.div`
    width: 100%;
    position: relative;
    background-color: ${colors.darkerWhite};
    overflow-y: auto;
`

const Grid = styled.div`
    padding: 1rem;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-column-gap: 2px;
    grid-row-gap: 2px;
`

const Container = styled.div`
    max-width: 700px;
    width: calc(100vw - 500px);
`