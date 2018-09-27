import React from 'react'
import styled from 'styled-components'
import { DragSource } from 'react-dnd'


const linkSource = {
    beginDrag(props) {
        console.log('begindrag', props)
        return {props}
    },
    endDrag(props, monitor, component) {
        console.log(props, monitor.getDropResult(), component)
        let sourceIndex = props.index
        if(!monitor.getDropResult()) return
        let targetIndex = monitor.getDropResult().index
        console.log(sourceIndex, targetIndex)
        props.move(sourceIndex, targetIndex)
    }
}

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    }
}

// Styled
const LinkContainer = styled.div`
  color: inherit;
  text-decoration: none;
  font-size: 2rem;
`

const Name = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #4e4e4e;
  text-transform: capitalize;
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

const DraggableLink = (props) => {
    const {index, alt, image, name, select} = props
    const { connectDragSource, isDragging } = props

    return connectDragSource(
        <div style={{
            opacity: isDragging ? 0.5 : 1,
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

export default DragSource('draggablelink', linkSource, collect)(DraggableLink)