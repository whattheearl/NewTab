// LinkPage
// Displays all links as tiles

import React, {Component} from 'react'
import styled from 'styled-components'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

// Component
import LinkTile from './Tile'
// import PlusButton from './PlusButton'
// import NewSiteModal from '../Modal/NewSite'
import CreateItemArea from './CreateItemArea'
import EditButton from './EditButton'
import EditSiteModal from '../../Modal/EditSite'
import ChromeTabArea from '../../ChromeTabArea'

// Colors
import colors from '../../../styles/colors'

// Styled
const MainArea = styled.div`
    display: flex;
    flex: 1;
    height: calc(100vh - 128px);
`

const Area = styled.div`
    height: 100%;
    width: calc(100vw - 500px);
    box-sizing: border-box;
    border-right: 1px solid ${colors.lightGray};
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

const Col = styled.div`
    display: flex;
    flex-direction: column;
`

const SpeedDialContainer = styled.div`
    margin-top: auto;
`

class LinkPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            linkTiles: [],
            sites: props.sites,
            displayNewSiteModal: false,
            editable: false,
            selectedSite: null,
        }
    }

    toggleEditable() {
        this.setState({
            editable: !this.state.editable
        })
    }

    addSite(site) {
        // copy previous page state and add new site
        let updatedSites = [...this.state.sites, site]
        // update tab with sites
        this.props.updateSites(updatedSites)
    }

    getPageCopy() {
        let page = Object.assign({}, this.state.page)
        const updatedSites = page.sites.slice()
        page.sites = updatedSites
        return page
    }

    // remove site at index
    removeSite(index) {
        let updatedSites = [
            ...this.state.sites.slice(0, index),
            ...this.state.sites.slice(index + 1)
        ]
        this.props.updateSites(updatedSites)
    }

    //replaces selectedSite with site
    replaceSite(site) {
        const index = this.state.sites.indexOf(this.state.selectedSite)
        let updatedSites = [
            ...this.state.sites.slice(0, index),
            site,
            ...this.state.sites.slice(index + 1)
        ]
        this.props.updateSites(updatedSites)
    }

    // selects site while edit is enabled
    selectSite(index) {
        this.setState({selectedSite: this.state.sites[index]})
        this.openEditSiteModal()
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
    
    closeEditSiteModal() {
        this.setState({displayEditSiteModal: false})
    }

    openNewSiteModal() {
        this.setState({displayNewSiteModal: true})
    }
    
    closeNewSiteModal() {
        this.setState({displayNewSiteModal: false})
    }

    // return list of linkTiles to render
    renderLinkTiles() {
        return this.state.sites.map((site, index) => {
            return <LinkTile 
                key={`${index}`} 
                index={index}
                alt={site.name} 
                name={site.name}
                url={site.url} 
                image={site.image}
                editable={this.state.editable}
                remove={this.removeSite.bind(this)}
                move={this.moveSite.bind(this)}
                select={this.selectSite.bind(this)}
            />
        })
    }

    componentDidUpdate() {
        if(this.props.sites !== this.state.sites) this.setState((state, props) => ({sites: props.sites}))
    }

    render() {
        return (
            <MainArea>
                <EditSiteModal
                    displaySelf={this.state.displayEditSiteModal} 
                    closeModal={this.closeEditSiteModal.bind(this)}
                    replaceSite={this.replaceSite.bind(this)}
                    selectedSite={this.state.selectedSite}
                />
                {/* <NewSiteModal 
                    displaySelf={this.state.displayNewSiteModal} 
                    closeModal={this.closeNewSiteModal.bind(this)}
                    saveSite={this.addSite.bind(this)} 
                /> */}
                <Area>
                    <Grid>
                        {this.renderLinkTiles()}
                    </Grid>
                    {/* <PlusButton onClick={this.openNewSiteModal.bind(this)}></PlusButton> */}
                </Area>
                <Col>
                    <EditButton toggleEditable={this.toggleEditable.bind(this)}/>
                    <ChromeTabArea 
                        selectSite={this.selectSite.bind(this)}
                        saveSite={this.addSite.bind(this)}
                    />
                    <SpeedDialContainer>
                        <CreateItemArea />
                    </SpeedDialContainer>
                </Col>
            </MainArea>
        )
    }
}

export default DragDropContext(HTML5Backend)(LinkPage)