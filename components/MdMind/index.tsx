import React, { useState, useRef, useEffect } from 'react'

const MarkdownMindmap = () => {
  const [markdown, setMarkdown] = useState(
    '# Root Topic\n## Subtopic 1\n### Detail 1.1\n### Detail 1.2\n## Subtopic 2\n### Detail 2.1\n#### Further Detail 2.1.1',
  )
  const [svgContent, setSvgContent] = useState('')
  const svgRef = useRef(null)

  // Parse markdown to hierarchical structure
  const parseMarkdown = (md) => {
    const lines = md.split('\n').filter((line) => line.trim() !== '')
    const root = { title: 'Root', children: [], level: 0 }
    const stack = [root]

    lines.forEach((line) => {
      const match = line.match(/^(#{1,6})\s+(.+)$/)
      if (match) {
        const level = match[1].length
        const title = match[2].trim()
        const node = { title, children: [], level }

        // Find the appropriate parent for this node
        while (stack.length > 1 && stack[stack.length - 1].level >= level) {
          stack.pop()
        }

        stack[stack.length - 1].children.push(node)
        stack.push(node)
      }
    })

    return root.children.length > 0
      ? root.children[0]
      : { title: 'Empty', children: [], level: 1 }
  }

  // Generate SVG mindmap
  const generateMindmap = (root) => {
    const width = 1000
    const height = 800
    const nodeHeight = 40
    const nodeWidth = 200
    const horizontalSpacing = 120
    const verticalSpacing = 80

    // Calculate positions for the tree
    const calculatePositions = (node, x = width / 2, y = 100, level = 0) => {
      node.x = x
      node.y = y

      const childCount = node.children.length
      const totalChildHeight =
        childCount * nodeHeight + (childCount - 1) * verticalSpacing
      const startY = y + 80 - totalChildHeight / 2

      node.children.forEach((child, index) => {
        const childY = startY + index * (nodeHeight + verticalSpacing)
        calculatePositions(
          child,
          x + horizontalSpacing + nodeWidth / 2,
          childY,
          level + 1,
        )
      })
    }

    calculatePositions(root)

    // Generate SVG elements
    const generateSvgElements = (node) => {
      let elements = []

      // Node rectangle
      const bgColor =
        ['#f9d5e5', '#eeac99', '#e06377', '#c83349', '#5b9aa0', '#d6d4e0'][
          node.level % 6
        ] || '#f0f0f0'

      elements.push(
        `<rect x="${node.x - nodeWidth / 2}" y="${
          node.y - nodeHeight / 2
        }" width="${nodeWidth}" height="${nodeHeight}" rx="10" ry="10" fill="${bgColor}" stroke="#333" stroke-width="1" />`,
      )
      elements.push(
        `<text x="${node.x}" y="${
          node.y + 5
        }" text-anchor="middle" font-family="Arial" font-size="14" fill="#000">${
          node.title
        }</text>`,
      )

      // Lines to children
      node.children.forEach((child) => {
        elements.push(
          `<path d="M${node.x + nodeWidth / 2} ${node.y} C${
            node.x + horizontalSpacing / 2
          } ${node.y}, ${child.x - horizontalSpacing / 2} ${child.y}, ${
            child.x - nodeWidth / 2
          } ${child.y}" stroke="#666" stroke-width="2" fill="none" />`,
        )
        elements = elements.concat(generateSvgElements(child))
      })

      return elements
    }

    const svgElements = generateSvgElements(root)
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <rect width="100%" height="100%" fill="#f8f9fa" />
      ${svgElements.join('\n')}
    </svg>`

    return svg
  }

  // Export SVG as PNG
  const exportAsPNG = () => {
    if (!svgRef.current) return

    const svgData = new XMLSerializer().serializeToString(svgRef.current)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()

    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)

      const pngFile = canvas.toDataURL('image/png')
      const downloadLink = document.createElement('a')
      downloadLink.download = 'mindmap.png'
      downloadLink.href = pngFile
      downloadLink.click()
    }

    img.src =
      'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)))
  }

  // Update SVG when markdown changes
  useEffect(() => {
    try {
      const root = parseMarkdown(markdown)
      const svg = generateMindmap(root)
      setSvgContent(svg)
    } catch (error) {
      console.error('Error generating mindmap:', error)
    }
  }, [markdown])

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css"
      />
      <h1 className="text-2xl font-bold mb-4">Markdown to Mindmap Converter</h1>

      <div className="flex flex-col md:flex-row flex-1 gap-4">
        {/* Input section */}
        <div className="w-full md:w-1/2 flex flex-col">
          <h2 className="text-lg font-semibold mb-2">Markdown Input</h2>
          <p className="text-sm text-gray-600 mb-2">
            Use heading levels (# ## ###) to create a hierarchy
          </p>
          <textarea
            className="flex-1 p-4 border rounded shadow-inner bg-white font-mono text-sm"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
          />
        </div>

        {/* Preview section */}
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">Mindmap Preview</h2>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={exportAsPNG}
            >
              Export as PNG
            </button>
          </div>
          <div className="flex-1 border rounded bg-white p-4 overflow-auto">
            <div
              ref={svgRef}
              dangerouslySetInnerHTML={{ __html: svgContent }}
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarkdownMindmap
