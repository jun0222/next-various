import React, { useState } from 'react'
import { Configuration, DefaultApi } from '../../openapi/client'

const FileList = () => {
  // apiClientの初期化
  const apiClient = new DefaultApi(
    new Configuration({ basePath: 'http://localhost:3000/api/' }),
  )

  // TODO: これをapi routesに書いて実際にDLできるようにする
  const downloadFile = async (filename: string) => {
    try {
      // apiClientからファイルをダウンロードする
      const response = await apiClient.filesFilenameDownloadGet({ filename })

      // ダウンロードするファイルのurlを生成する
      const url = window.URL.createObjectURL(new Blob([response]))

      // ファイルをダウンロードするaタグを生成する
      const link = document.createElement('a')

      // aタグのhref属性を設定する
      link.href = url

      // aタグのdownload属性を設定する
      link.setAttribute('download', filename)

      // aタグをbodyに追加してクリックする
      document.body.appendChild(link)

      // aタグをクリックする
      link.click()
    } catch (error) {
      // コンソールにエラーを出力する
      console.error(error)
    }
  }

  // ファイルの一覧
  const files = [
    { id: 1, name: 'file1.txt' },
    { id: 2, name: 'file2.txt' },
  ]

  // 選択されたファイルの一覧
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])

  // チェックボックスの変更時の処理
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // チェックボックスのname属性とchecked属性を取得する
    const { name, checked } = event.target

    // チェックボックスのname属性をselectedFilesに追加するか削除する
    setSelectedFiles((prev) =>
      checked ? [...prev, name] : prev.filter((filename) => filename !== name),
    )
  }

  // ダウンロードボタンのクリック時の処理
  const handleDownloadClick = () => {
    // 選択されたファイルがない場合はアラートを表示する
    if (selectedFiles.length === 0) {
      alert('Please select at least one file to download.')
      return
    }

    // 選択されたファイルをダウンロードする
    selectedFiles.forEach((filename) => downloadFile(filename))
  }

  return (
    <div>
      {/* ファイルの一覧 */}
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

      {/* ダウンロードボタン */}
      <button onClick={handleDownloadClick}>Download</button>
    </div>
  )
}

export default FileList
