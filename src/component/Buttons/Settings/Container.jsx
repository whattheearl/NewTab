import React, { Component } from 'react'
import Setting from './index'

class SettingsContainer extends Component {
    onClick(e) {
        console.log('clicked settings button ')
        e.preventDefault()
        e.stopPropagation()

    }

    render() {
        return <Setting 
            display={!!this.props.selectedWorkspace}
            onClick={this.onClick.bind(this)}
        />;
    }
}
export default SettingsContainer