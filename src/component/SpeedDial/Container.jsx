import React, { Component } from 'react'

// Components
import SpeedDial from '../../component/SpeedDial'

// temp data
//TODO: remove
import defaultSpeedDial from '../../data/speeddial'

class SpeedDialContainer extends Component {
    constructor(props) {
        super(props)
        let speedDial = JSON.parse(window.localStorage.getItem('speedDial')) || defaultSpeedDial

        this.state = {
            speedDial
        }
    }

    exportSpeedDial() {
        window.localStorage.setItem('speedDial', JSON.stringify(this.state.speedDial))
    }

    speedDialHandler = (action, data) => {
        let index
        switch(action) {
            case 'ADD_SITE':
                this.setState(
                    // append new site
                    state => ({
                        speedDial: [...state.speedDial, data.site]
                    }),
                    // save to local storage
                    this.exportSpeedDial
                )
                return
            case 'REMOVE_SITE':
                index = this.state.speedDial.indexOf(data.site)
                this.setState(state => ({
                    speedDial: [
                        ...state.speedDial.slice(0, index),
                        ...state.speedDial.slice(index + 1),
                    ]
                }),
                    this.exportSpeedDial
                )
                return
            case 'REPLACE_SITE':
                index = this.state.speedDial.indexOf(data.site)
                this.setState(state => ({
                    speedDial: [
                        ...state.speedDial.slice(0, index),
                        data.updatedSite,
                        ...state.speedDial.slice(index + 1),
                    ]
                }),
                    this.exportSpeedDial
                )
                return
            default:
                console.error('speedDialHandler no use case')
                return
        }
    }

    render() {
        if(!this.props.display) return null
        return (
            <div>
                <SpeedDial 
                    handler={this.speedDialHandler} 
                    sites={this.state.speedDial} 
                />
            </div>
        )
    }
}
export default SpeedDialContainer

