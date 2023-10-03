import { useState } from 'react'
import { Box, ChakraProvider, Flex, Heading, Text } from '@chakra-ui/react'
import {
  DragDropContext,
  Droppable,
  Draggable,
  resetServerContext,
} from 'react-beautiful-dnd'

type Item = {
  id: string
  content: string
}

const initialItems: Item[] = [
  { id: '1', content: 'Item 1' },
  { id: '2', content: 'Item 2' },
  { id: '3', content: 'Item 3' },
  { id: '4', content: 'Item 4' },
  { id: '5', content: 'Item 5' },
]

function App() {
  resetServerContext()
  const [items, setItems] = useState<Item[]>(initialItems)

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const newItems = [...items]
    const [reorderedItem] = newItems.splice(result.source.index, 1)
    newItems.splice(result.destination.index, 0, reorderedItem)

    setItems(newItems)
  }

  return (
    <ChakraProvider>
      <Box p={4}>
        <Heading mb={4}>Sortable Items</Heading>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="items">
            {(provided) => (
              <Flex
                {...provided.droppableProps}
                ref={provided.innerRef}
                flexWrap="wrap"
              >
                {items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <Box
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        bg="gray.100"
                        p={4}
                        m={2}
                        borderRadius="md"
                        boxShadow="md"
                        cursor="grab"
                        minWidth="200px"
                      >
                        <Text>{item.content}</Text>
                      </Box>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Flex>
            )}
          </Droppable>
        </DragDropContext>
      </Box>
    </ChakraProvider>
  )
}

export default App
