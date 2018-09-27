import React, {Component} from 'react'
import styled from 'styled-components'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

// Component
import LinkTile from './Tile'
import PlusButton from './PlusButton'
import NewSiteModal from './NewSiteModal'
import EditButton from './EditButton'
import EditSiteModal from './EditSiteModal'

// Styled
const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    max-width: 800px;
    margin: 0 auto;
`

const Area = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`

// Temp Code
let shortcut = {
    name: 'facebook',
    url: 'https://facebook.com',
    image: 'http://www.valuewalk.com/wp-content/uploads/2017/11/facebook_1509720559.png',
}

class LinkArea extends Component {
    constructor(props) {
        super(props)
        this.state = {
            linkTiles: [],
            sites: [],
            displayNewSiteModal: false,
            editable: true,
        }
    }

    toggleEditable() {
        console.log('toggle')
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
        // copy previous site state
        let sites = this.state.sites.slice()
        // copy site info and add index
        let newSite = Object.assign({}, site)
        // create new tile and add to new state
        sites.push(newSite)
        this.setState({sites})
        this.closeModal()
    }

    // remove site at index
    removeSite(index) {
        const updatedSites = this.state.sites.slice()
        let removedSite = updatedSites.splice(index, 1)
        this.setState({sites: updatedSites})
        return removedSite
    }

    replaceSite(site) {
        const updatedSites = this.state.sites.slice()
        // remove
        updatedSites.splice(this.state.selectedSite.index, 1, site)
        // insert
        this.setState({sites: updatedSites})
    }

    // selects site while edit is enabled
    selectSite(index) {
        console.log(index)
        console.log(this.state.sites[index])
        this.setState({selectedSite: this.state.sites[index]})
        this.openEditSiteModal()
    }

    // removes source then inserts it at target
    moveSite(sourceIndex, targetIndex) {
        // do nothing if source == target
        if(sourceIndex === targetIndex) return
        const updatedSites = this.state.sites.slice()
        // remove
        updatedSites.splice(sourceIndex, 1)
        // insert
        updatedSites.splice(targetIndex, 0, this.state.sites[sourceIndex])
        this.setState({sites: updatedSites})
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
        for(let i = 0; i < this.state.sites.length; i++) {
            // assign index
            let site = Object.assign({}, this.state.sites[i])
            site.index = i
            // create linkTile
            linkTiles.push(
                this.createLinkTile(site)
            )
        }
        return linkTiles
    }

    createSites() {
        let sites = []
        for(let i = 0; i < 8; i++) {
            let site = Object.assign({}, shortcut)
            site.name = site.name + i
            sites.push(site)
        }
        return sites
    }

    componentDidMount() {
        this.setState({sites: this.createSites()})
    }

    render() {
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

export default DragDropContext(HTML5Backend)(LinkArea)