// Draggable Link Tile
// Allow for removal as well as reorganizing of Tiles
import React, { Component } from 'react'
import styled from 'styled-components'
import { DragSource } from 'react-dnd'
import { FaEllipsisV } from 'react-icons/fa'

import bookmark from '../../image/bookmark.png'
import Thumbnail from '../Thumbnail'

// Colors
import colors from '../../styles/colors'

// Handle Drag Events
const linkSource = {
    // Pass source object to monitor
    beginDrag(props) {
        return { props }
    },
    // Move Tile to dropped location
    endDrag(props, monitor, component) {
        let sourceIndex = props.index
        // cancel if dropped on non tile
        if (!monitor.getDropResult()) return
        let targetIndex = monitor.getDropResult().index
        props.move(sourceIndex, targetIndex)
    }
}

// Connect to event handler
function collect(connect) {
    return {
        connectDragSource: connect.dragSource(),
    }
}

class EditableLink extends Component {
    constructor(props) {
        super(props)
        this.ellipsisHiddenStyle = { 
            opacity: 0,
            color: colors.darkWhite,
            cursor: 'pointer',
            position: 'absolute',
            top: '5px',
            right: '-8px',
            zIndex: 1,
        }
        this.ellipsisFadeIn = {    
            opacity: 1,
            transition: 'all .7s ease-in',
            color: colors.babyBlue,
            cursor: 'pointer',
            position: 'absolute',
            top: '5px',
            right: '-8px',
            zIndex: 1,
        }
        this.state = {
            ellipsisHidden: true,
            error: false,
            image: this.props.image
        }
    }

    fadeInEllipsis() {
        this.setState({ ellipsisHidden: false })
    }

    hideEllipsis() {
        this.setState({ ellipsisHidden: true })
    }

    renderEllipsis() {
        let style = this.state.ellipsisHidden? this.ellipsisHiddenStyle : this.ellipsisFadeIn
        return (
            <FaEllipsisV 
                onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    this.props.select(this.props.index)
                }}
                style={style}
            />
        )
    }

    renderName() {
        let { name } = this.props
        if(name.length > 13) name = `${name.substring(0, 11)}...`
        return (<Name>{`${name}`}</Name>)
    }

    render() {
        const { image, url, name, connectDragSource } = this.props
        return connectDragSource(
            <div >
                <LinkContainer 
                    href={url}
                    style={{cursor: 'pointer'}}
                    onMouseEnter={this.fadeInEllipsis.bind(this)} 
                    onMouseLeave={this.hideEllipsis.bind(this)}
                    target={'_blank'}
                >
                    <BorderColumn>
                        {this.renderEllipsis()}
                        <Thumbnail 
                            image={image} 
                            backupImage={bookmark} 
                            width={'100px'} 
                            height={'100px'} 
                            onError={() => {this.setState({error: true})}} 
                            alt={name}
                        />
                        {this.state.error? <Acronym>{name.substring(0, 3)}</Acronym> : null}
                        {this.renderName()}
                    </BorderColumn>
                </LinkContainer>
            </div>
        )
    }

}
export default DragSource('editablelink', linkSource, collect)(EditableLink)

// Styled
const LinkContainer = styled.a`
    display: block;
    color: inherit;
    text-decoration: none;
    font-size: 2rem;
    border-radius: 15px;
    text-transform: capitalize;
    background-color: ${colors.white};
    &:hover {
        background-color: white;
        animation-name: bounce;
        animation-duration: 1s;
        animation-iteration-count: 5;
    }
`

const Name = styled.h2`
    max-width: 120px;
    padding-top: .66rem;
    text-align: center;
    font-size: 1.2rem;
    height: 1.3rem;
    width: 100%;
    color: #4e4e4e;
    word-wrap: nowrap;
    overflow: hidden;
`

const BorderColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
    padding-top: 25px;
    padding-bottom: 5px;
    position: relative;
    text-decoration: none;
    color: ${colors.white};
    background-color: white;
    overflow: hidden;
    box-sizing: border-box;
    :visited {
        color: ${colors.white};
        text-decoration: none;
    }
    :hover {
        z-index: 10;
        border-top: 2px solid ${colors.babyBlue};
        padding-top: 20px;
        padding-bottom: 8px;
    }
`

const Acronym = styled.div`
    color: ${colors.darkBlue};
    position: absolute;
    font-size: 3rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%)
`