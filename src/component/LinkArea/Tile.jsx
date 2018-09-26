import React, {Component} from 'react'
import styled from 'styled-components'
import {FaWindowClose} from 'react-icons/fa'
import { DropTarget } from 'react-dnd'

// Components
import DraggableLink from './DraggableLink'

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
  render() {
    const {move, url, name, image, remove, connectDropTarget} = this.props
    let {alt} = this.props
    if(!alt) alt = name
    return connectDropTarget(
      <div>
        <Container>
          <Column>
            <RemoveButton onClick={() => {
                remove(this.props.index)
              }}>
              <FaWindowClose/>
            </RemoveButton>
            <DraggableLink index={this.props.index} url={url} name={name} image={image} alt={alt} move={move} />
          </Column>
        </Container>
      </div>
    )
  }
}
export default DropTarget('draggablelink', tileTarget, collect)(Tile)