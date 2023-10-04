import React, { useState } from 'react'
import { DragDropContext, resetServerContext } from 'react-beautiful-dnd'
import { ItemType } from './types'
import List from './List'
import { StrictModeDroppable } from './StrictModeDroppable'

const reorder = (
  list: ItemType[],
  startIndex: number,
  endIndex: number,
): ItemType[] => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const App = () => {
  const initial: ItemType[] = Array.from({ length: 10 }, (v, k) => k).map(
    (k) => {
      return {
        id: `id-${k}`,
        content: `Item ${k}`,
      }
    },
  )
  const [state, setState] = useState({ items: initial })

  const onDragEnd = (result) => {
    if (!result.destination) {
      return
    }

    if (result.destination.index === result.source.index) {
      return
    }

    const items = reorder(
      state.items,
      result.source.index,
      result.destination.index,
    )

    setState({ items })
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <StrictModeDroppable droppableId="list">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <List items={state.items} />
            {provided.placeholder}
          </div>
        )}
      </StrictModeDroppable>
    </DragDropContext>
  )
}

export default App
