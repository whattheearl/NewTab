// LinkPage
// Displays all links as tiles

import React, {Component} from 'react'
import styled from 'styled-components'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

// Component
import LinkTile from './Tile'
import PlusButton from './PlusButton'
import NewSiteModal from './Modal/NewSite'
import EditButton from './EditButton'
import EditSiteModal from './Modal/EditSite'

// Colors
import colors from '../../styles/colors'

// Styled
const Area = styled.div`
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    position: relative;
    background-color: ${colors.darkerWhite};
`

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    margin-right: 90px;
    grid-column-gap: 2px;
    grid-row-gap: 2px;
`

class LinkPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            linkTiles: [],
            sites: props.sites,
            displayNewSiteModal: false,
            editable: true,
            selectedSite: null,
        }
    }

    toggleEditable() {
        this.setState({
            editable: !this.state.editable
        })
    }

    createLinkTile({index, name, url, image}) {
        return (
            <LinkTile 
                key={`${index}`} 
                index={index}
                alt={name} 
                name={name}
                url={url} 
                image={image}
                editable={this.state.editable}
                remove={this.removeSite.bind(this)}
                move={this.moveSite.bind(this)}
                select={this.selectSite.bind(this)}
            />
        )
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
        let linkTiles = []
        const {sites} = this.state
        for(let i = 0; i < sites.length; i++) {
            // assign index
            let site = Object.assign({}, sites[i])
            site.index = i
            // create linkTile
            linkTiles.push(
                this.createLinkTile(site)
            )
        }
        return linkTiles
    }

    render() {
        console.log('LinkPage props', this.props)
        if(this.props.sites !== this.state.sites) this.setState({sites: this.props.sites})
        return (

                <Area>
                    <EditSiteModal
                        displaySelf={this.state.displayEditSiteModal} 
                        closeModal={this.closeEditSiteModal.bind(this)}
                        replaceSite={this.replaceSite.bind(this)}
                        selectedSite={this.state.selectedSite}
                    />
                    <NewSiteModal 
                        displaySelf={this.state.displayNewSiteModal} 
                        closeModal={this.closeNewSiteModal.bind(this)}
                        saveSite={this.addSite.bind(this)} 
                    />
                    <EditButton toggleEditable={this.toggleEditable.bind(this)}/>
                    <Grid>
                        {this.renderLinkTiles()}
                    </Grid>
                    <PlusButton onClick={this.openNewSiteModal.bind(this)}></PlusButton>
                </Area>

        )
    }
}

export default DragDropContext(HTML5Backend)(LinkPage)