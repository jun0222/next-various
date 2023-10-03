import React from 'react'
import Item from './Item'

const List = React.memo<{ items }>(({ items }) => (
  <>
    {items.map((item, index: number) => (
      <Item item={item} index={index} key={item.id} />
    ))}
  </>
))

List.displayName = 'List'

export default List
