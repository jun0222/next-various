import React, { useState } from 'react'
import { Configuration, DefaultApi } from '../../openapi/client'

const apiClient = new DefaultApi(
  new Configuration({ basePath: 'http://localhost:3000/api/' }),
)

// TODO: これをapi routesに書いて実際にDLできるようにする
async function downloadFile(filename: string) {
  console.log('====downloadFile======')
  try {
    const response = await apiClient.filesFilenameDownloadGet({ filename })
    // const url = window.URL.createObjectURL(new Blob([response]))
    // const link = document.createElement('a')
    // link.href = url
    // link.setAttribute('download', filename)
    // document.body.appendChild(link)
    // link.click()
    console.log('filename', filename)
    console.log('response', response)
    return response // TODO: api routesに書いたらここは消す
  } catch (error) {
    console.error(error)
  }
}

const FileList = () => {
  const files = [
    { id: 1, name: 'file1.txt' },
    { id: 2, name: 'file2.txt' },
  ]

  const [selectedFiles, setSelectedFiles] = useState<string[]>([])

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target
    setSelectedFiles((prev) =>
      checked ? [...prev, name] : prev.filter((filename) => filename !== name),
    )
  }

  const handleDownloadClick = () => {
    if (selectedFiles.length === 0) {
      alert('Please select at least one file to download.')
      return
    }
    console.log('====handleDownloadClick======')
    selectedFiles.forEach((filename) => downloadFile(filename))
  }

  return (
    <div>
      {files.map((file: any) => (
        <div key={file.id}>
          <input
            type="checkbox"
            id={file.id}
            name={file.name}
            onChange={handleCheckboxChange}
          />
          <label htmlFor={file.id}>{file.name}</label>
        </div>
      ))}
      <button onClick={handleDownloadClick}>Download</button>
    </div>
  )
}

export default FileList
