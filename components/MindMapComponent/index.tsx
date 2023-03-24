import React, { useState } from 'react'
import Tree from 'react-d3-tree'

interface CustomTreeNode {
  name: string
  children?: CustomTreeNode[]
}

const initialTreeData: CustomTreeNode = {
  name: 'ルート',
}

function MindMap() {
  const [inputValue, setInputValue] = useState('')
  const [treeData, setTreeData] = useState<CustomTreeNode>(initialTreeData)
  const [selectedNode, setSelectedNode] = useState<CustomTreeNode | null>(null)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const handleNodeClick = (nodeData: any) => {
    setSelectedNode(nodeData.data as CustomTreeNode)
  }

  // Helper function to find a node by name
  const findNode = (
    node: CustomTreeNode,
    name: string,
  ): CustomTreeNode | null => {
    if (node.name === name) {
      return node
    }

    if (node.children) {
      for (const child of node.children) {
        const found = findNode(child, name)
        if (found) {
          return found
        }
      }
    }

    return null
  }

  const addNode = () => {
    if (inputValue === '' || !selectedNode) return

    const newNode: CustomTreeNode = { name: inputValue }

    // Create a deep copy of treeData
    const newTreeData = JSON.parse(JSON.stringify(treeData))

    // Find the selected node in the deep copy of treeData
    const targetNode = findNode(newTreeData, selectedNode.name)

    // Add the new child node to the selected node
    if (targetNode) {
      if (!targetNode.children) {
        targetNode.children = [newNode]
      } else {
        targetNode.children.push(newNode)
      }
    }

    // Update treeData
    setTreeData(newTreeData)

    // Clear input field
    setInputValue('')
  }

  return (
    <div>
      <title>マインドマップ</title>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="新しいノードを入力"
      />
      <button onClick={addNode}>ノードを追加</button>
      <div style={{ width: '100%', height: '1500px', paddingTop: '200px' }}>
        <Tree
          data={treeData}
          onNodeClick={handleNodeClick}
          translate={{ x: 200, y: 250 }}
        />
      </div>
    </div>
  )
}

export default MindMap
