import React, {Component} from 'react'
import styled from 'styled-components'
import {FaWindowClose} from 'react-icons/fa'
import { DropTarget } from 'react-dnd'

// Components
import DraggableLink from './DraggableLink'
import NormalLink from './NormalLink'

// Drag and Drop (react-dnd)
const tileTarget = {
    drop(props) {
        console.log('release drag', props)
        return props
    }
}

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    }
}

// Styled
const Container = styled.div`
`

const Column = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
`

const RemoveButton = styled.div`
    position: absolute;
    right: 15px;
    top: 0;
    color: tomato;
    font-size: 2.2rem;
`

class Tile extends Component {
    renderRemoveButton() {
        if(!this.props.editable) return null
        return (
            <RemoveButton 
                onClick={() => {this.props.remove(this.props.index)}}
            >
                <FaWindowClose/>
            </RemoveButton>
        )
    }

    renderLink() {
        const {index, url, name, image, move, editable, select} = this.props
        const {alt} = this.props || name
        if(editable) {
            return (
                <DraggableLink 
                    index={index} 
                    url={url} 
                    name={name} 
                    image={image} 
                    alt={alt} 
                    move={move}
                    select={select}
                />
            )
        }
        return (
            <NormalLink 
                index={index} 
                url={url} name={name} 
                image={image} 
                alt={alt}
            />
        )
    }

    render() {
        const {connectDropTarget} = this.props
        return connectDropTarget(
            <div>
                <Container>
                    <Column>
                        {this.renderRemoveButton()}
                        {this.renderLink()}
                    </Column>
                </Container>
            </div>
        )
    }
}
export default DropTarget('draggablelink', tileTarget, collect)(Tile)