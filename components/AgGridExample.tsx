// Reactライブラリをインポートしています。これにより、Reactコンポーネントを作成するための機能が利用可能になります。
import React, { useState } from 'react'
// ag-Grid Reactコンポーネントをインポートしています。これを使用して、グリッドをReactアプリケーションに組み込むことができます。
import { AgGridReact } from 'ag-grid-react'
// ag-Gridの基本スタイルシートをインポートしています。これはグリッドの基本的なスタイルを提供します。
import 'ag-grid-community/styles/ag-grid.css'
// ag-GridのAlpineテーマのスタイルシートをインポートしています。これにより、グリッドに特定の見た目（Alpineテーマ）が適用されます。
import 'ag-grid-community/styles/ag-theme-alpine.css'

// AgGridExampleという名前の関数コンポーネントを定義しています。
const AgGridExample = () => {
  // グリッドの列を定義する配列です。各列にはヘッダー名（headerName）と、その列に対応するデータのフィールド名（field）が指定されています。
  const [columnDefs, setColumnDefs] = useState([
    { headerName: 'ID', field: 'id' }, // 1列目は"ID"という名前で、データオブジェクトの"id"フィールドの値を表示します。
    { headerName: 'Value', field: 'value' }, // 2列目は"Value"という名前で、データオブジェクトの"value"フィールドの値を表示します。
  ])

  // グリッドに表示する行のデータを定義する配列です。各オブジェクトは一行のデータを表し、"id"と"value"のキーを持っています。
  const rowData = [
    { id: 1, value: 'A' },
    { id: 2, value: 'B' },
    { id: 3, value: 'C' },
  ]

  // コンポーネントがレンダリングするJSXを返します。ここでは、ag-Gridのグリッドを表示するためのdiv要素と、AgGridReactコンポーネントを使用しています。
  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
      {/* AgGridReactコンポーネントを使用してグリッドを表示します。このコンポーネントには、上で定義した列定義（columnDefs）と行データ（rowData）を渡しています。 */}
      <AgGridReact columnDefs={columnDefs} rowData={rowData}></AgGridReact>
    </div>
  )
}

// このコンポーネントを他のファイルからインポートして使用できるように、デフォルトエクスポートしています。
export default AgGridExample
