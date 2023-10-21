import React, { useState } from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import DraggableList from './DraggableList'

const initialItems = [
  'Item 1 strictMode false',
  'Item 2 じゃないと',
  'Item 3 動かない',
]

const PageComponent: React.FC = () => {
  const [items, setItems] = useState(initialItems)

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }

    const reorderedItems = Array.from(items)
    const [removed] = reorderedItems.splice(result.source.index, 1)
    reorderedItems.splice(result.destination.index, 0, removed)

    setItems(reorderedItems)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <DraggableList>
        {items.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </DraggableList>
    </DragDropContext>
  )
}

export default PageComponent
