// Checkbox.tsx
import React, { useState } from 'react'

// チェックボックスのコンポーネント
const Checkbox = () => {
  const [checked, setChecked] = useState(false) // チェック状態を管理するstate

  // チェックボックスの状態を反転させる
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={() => setChecked(!checked)}
      data-testid="checkbox"
    />
  )
}

export default Checkbox
