import React from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { Box } from '@chakra-ui/react'

type DraggableListProps = {
  children: React.ReactElement[]
}

const DraggableList: React.FC<DraggableListProps> = ({ children }) => {
  return (
    <Droppable droppableId="droppable-list">
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {React.Children.toArray(children).map((child, index) => (
            <Draggable
              key={index.toString()}
              draggableId={index.toString()}
              index={index}
            >
              {(provided) => (
                <Box
                  p={4}
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  {child}
                </Box>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

export default DraggableList
