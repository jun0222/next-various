// components/ChildrenDragDropSort/PageComponent.tsx
import React, { useState } from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import DraggableList from './DraggableList'
import { useIsClient } from './useIsClient'

const initialItems = [
  { id: '1', label: 'Item 1 strictMode false' },
  { id: '2', label: 'Item 2 じゃないと' },
  { id: '3', label: 'Item 3 動かない' },
]

const PageComponent: React.FC = () => {
  const [items, setItems] = useState(initialItems)
  const isClient = useIsClient()

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }

    const reorderedItems = Array.from(items)
    const [removed] = reorderedItems.splice(result.source.index, 1)
    reorderedItems.splice(result.destination.index, 0, removed)

    setItems(reorderedItems)
  }

  if (!isClient) {
    return null // ここでnullを返すか、代わりにローディングインジケータを返してもよい
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <DraggableList>
        {items.map((item) => (
          <div key={item.id} id={item.id}>
            {item.label}
          </div>
        ))}
      </DraggableList>
    </DragDropContext>
  )
}

export default PageComponent
