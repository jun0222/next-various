import React from 'react'

// Taskのプロパティの型定義
type TaskProps = {
  task: {
    id: string
    title: string
    state: string
  }
  onArchiveTask: (id: string) => void
  onPinTask: (id: string) => void
}

const Task: React.FC<TaskProps> = ({
  task: { id, title, state },
  onArchiveTask,
  onPinTask,
}) => {
  return (
    <div className="list-item">
      <input type="text" value={title} readOnly={true} />
    </div>
  )
}

export default Task
