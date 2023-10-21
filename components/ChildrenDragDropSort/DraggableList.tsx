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
          {React.Children.toArray(children).map((child, index) => {
            if (React.isValidElement(child)) {
              return (
                <Draggable
                  key={child.props.id} // or child.key
                  draggableId={child.props.id}
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
              )
            }
            return null // or some fallback rendering
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

export default DraggableList
