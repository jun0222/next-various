import { useState, useEffect } from 'react'
import styles from './Timer.module.css'

const Timer = () => {
  const [seconds, setSeconds] = useState<number>(0)
  const [inputValue, setInputValue] = useState<string>('')

  useEffect(() => {
    let interval: any = null
    if (seconds > 0) {
      interval = setInterval(() => {
        setSeconds(seconds - 1)
      }, 1000)
    } else {
      clearInterval(interval)
      alert('Timer is up!')
    }
    return () => clearInterval(interval)
  }, [seconds])

  const startTimer = () => {
    setSeconds(parseInt(inputValue))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  return (
    <div className={styles['timer-container']}>
      <title>タイマー</title>
      <h1>Timer: {seconds}</h1>
      <input
        className={styles['timer-input']}
        type="number"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button className={styles['timer-button']} onClick={startTimer}>
        Start Timer
      </button>
    </div>
  )
}

export default Timer
