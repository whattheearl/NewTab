// Draggable Link Tile
// Allow for removal as well as reorganizing of Tiles
import React from 'react'
import styled from 'styled-components'
import { DragSource } from 'react-dnd'

// Colors
import colors from '../../../../styles/colors'

// Handle Drag Events
const linkSource = {
    // Pass source object to monitor
    beginDrag(props) {
        return {props}
    },
    // Move Tile to dropped location
    endDrag(props, monitor, component) {
        let sourceIndex = props.index
        // cancel if dropped on non tile
        if(!monitor.getDropResult()) return
        let targetIndex = monitor.getDropResult().index
        console.log(sourceIndex, targetIndex)
        props.move(sourceIndex, targetIndex)
    }
}

// Connect to event handler
function collect(connect) {
    return {
        connectDragSource: connect.dragSource(),
    }
}

// Styled
const LinkContainer = styled.div`
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
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: #4e4e4e;
`

const Column = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
`

const Thumb = styled.img`
    width: 100px;
    height: 100px;
    margin: 15px;
    margin-bottom: 15px;
    border-radius: 15px;
    object-fit: cover;
    border: 1px solid #2e2e2e17;
`

const EditableLink = (props) => {
    const {index, alt, image, name, select} = props
    const { connectDragSource } = props

    return connectDragSource(
        <div style={{
            fontWeight: 'bold',
            cursor: 'move'
        }}>
            <LinkContainer onClick={()=>{select(index)}}>
                <Column>
                    <Thumb src={image} alt={alt}/>
                    <Name>{name}</Name>
                </Column>
            </LinkContainer>
        </div>
    )
    
}

export default DragSource('editablelink', linkSource, collect)(EditableLink)