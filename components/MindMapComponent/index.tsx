import React from 'react'
import Tree from 'react-d3-tree'

const MindMapComponent: React.FC = () => {
  const treeData = {
    name: 'Root',
    children: [
      {
        name: 'Node 1',
        children: [
          {
            name: 'Node 1.1',
          },
          {
            name: 'Node 1.2',
          },
        ],
      },
      {
        name: 'Node 2',
      },
    ],
  }

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Tree
        data={treeData}
        nodeSize={{ x: 140, y: 30 }}
        transitionDuration={0}
        translate={{ x: 300, y: 100 }}
        orientation="vertical"
        separation={{ siblings: 1.2, nonSiblings: 1.2 }}
      />
    </div>
  )
}

export default MindMapComponent
