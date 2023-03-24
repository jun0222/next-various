import React, { useState, useEffect } from 'react'
import styles from './PomodoroTimer.module.css'

const PomodoroTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)
  const [isRunning, setIsRunning] = useState(false)

  function formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`
  }

  function startTimer(): void {
    if (isRunning) return

    setIsRunning(true)
    setTimer(
      setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          if (prevTimeLeft <= 1) {
            alert('Time is up!')
            clearInterval(timer as NodeJS.Timeout)
            setIsRunning(false)
            return 25 * 60
          }
          return prevTimeLeft - 1
        })
      }, 1000),
    )
  }

  function stopTimer(): void {
    setIsRunning(false)
    clearInterval(timer as NodeJS.Timeout)
  }

  function resetTimer(): void {
    stopTimer()
    setTimeLeft(25 * 60)
  }

  useEffect(() => {
    return () => {
      clearInterval(timer as NodeJS.Timeout)
    }
  }, [timer])

  return (
    <div className={styles.center}>
      <title>Pomodoro Timer</title>
      <h1>Pomodoro Timer</h1>
      <div className={styles.timer}>{formatTime(timeLeft)}</div>
      <div className={styles.buttons}>
        <button className={styles.button} onClick={startTimer}>
          Start
        </button>
        <button className={styles.button} onClick={stopTimer}>
          Stop
        </button>
        <button className={styles.button} onClick={resetTimer}>
          Reset
        </button>
      </div>
    </div>
  )
}

export default PomodoroTimer
