import React, { useState, useEffect } from 'react'

const sampleData = [
  'apple',
  'banana',
  'cherry',
  'date',
  'fig',
  'grape',
  'kiwi',
  'lemon',
  'mango',
  'orange',
  'papaya',
  'pineapple',
  's',
  'st',
  'str',
  'stra',
  'straw',
  'strawb',
  'strawbe',
  'strawber',
  'strawberr',
  'strawberry',
]

const IncrementalSearch: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('')
  const [searchResults, setSearchResults] = useState<string[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  useEffect(() => {
    if (inputValue) {
      const results = sampleData.filter((item) =>
        item.toLowerCase().startsWith(inputValue.toLowerCase()),
      )
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }, [inputValue])

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleChange} />
      <ul>
        {searchResults.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
    </div>
  )
}

const App: React.FC = () => {
  return (
    <div>
      <IncrementalSearch />
    </div>
  )
}

export default App
