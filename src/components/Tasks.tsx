import { Trash } from 'phosphor-react'
import { useState } from 'react';

import styles from './Tasks.module.css'

interface TasksProps {
  id: string;
  content: string;
  onDeleteTask: (task: string) => void;
}

export function Tasks({ id, content, onDeleteTask }: TasksProps) {
  const [isCompleted, setIsCompleted] = useState(false)

  function handleDeleteTask() {
    onDeleteTask(id)
  }

  function handleOnCompletedTask() {
    if (isCompleted) {
      setIsCompleted(false);
    } else {
      setIsCompleted(true);
    }
  }

  return (
    <div className={styles.taskBox}>
      <input
        type="checkbox"
        readOnly
        checked={isCompleted}
        onClick={handleOnCompletedTask}
      />

      <span className={isCompleted === true ? 'completed' : ''}>{content}</span>
      <button
        onClick={handleDeleteTask}
        type="button"
      >
        <Trash size={20} />
      </button>
    </div>
  )
}