import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'

const StyledItem = styled.div`
  width: 200px;
  border: 1px solid grey;
  margin-bottom: 8px;
  background-color: lightblue;
  padding: 8px;
`

const Item = ({ item, index }) => {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided) => (
        <StyledItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {item.content}
        </StyledItem>
      )}
    </Draggable>
  )
}

export default Item
