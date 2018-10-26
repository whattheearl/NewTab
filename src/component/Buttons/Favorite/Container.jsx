import React, { Component } from 'react'
import Favorite from './index'

class FavoriteContainer extends Component {
    onClick(e) {
        console.log('fav container')
        e.preventDefault()
        e.stopPropagation()
        this.props.workspaceHandler('TOGGLE_SAVE_WORKSPACE')
    }

    render() {
        return <Favorite 
            display={!!this.props.selectedWorkspace}
            isFull={!!this.props.selectedWorkspace && this.props.selectedWorkspace.saved}
            onClick={this.onClick.bind(this)}
        />;
    }
}
export default FavoriteContainer