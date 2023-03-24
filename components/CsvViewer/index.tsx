import { useState } from 'react'
import { parse } from 'csv'
import styles from './CsvViewer.module.css'

async function parseCsvData(csvData: string): Promise<any[][]> {
  return new Promise((resolve, reject) => {
    parse(csvData, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

const TableView = ({ data }: { data: any[][] }) => {
  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr>
          {data[0].map((col: any, i: number) => (
            <th className={styles.th} key={i}>
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.slice(1).map((row: any[], i: number) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td className={styles.td} key={j}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const CsvViewer = () => {
  const [tableData, setTableData] = useState<any[][]>([])

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]
    if (!file) {
      return
    }

    const fileReader = new FileReader()
    fileReader.onload = async (e) => {
      const data = await parseCsvData(e.target?.result as string)
      setTableData(data)
    }
    fileReader.readAsText(file)
  }

  return (
    <div className={styles.body}>
      <title>CSVビューワー</title>
      <div className={styles.container}>
        <h1 className={styles.h1}>CSV Viewer</h1>
        <form>
          <input type="file" onChange={handleFileChange} />
        </form>
        {tableData.length > 0 && <TableView data={tableData} />}
      </div>
    </div>
  )
}

export default CsvViewer
