// Star button used to favorite workspaces
import React, { Component } from 'react'
import Favorite from './index'

class FavoriteContainer extends Component {
    onClick(e) {
        console.log('fav container')
        e.preventDefault()
        e.stopPropagation()
    }

    render() {
        return <Favorite 
            isFull={true}
            onClick={this.onClick.bind(this)}
        />;
    }
}
export default FavoriteContainer