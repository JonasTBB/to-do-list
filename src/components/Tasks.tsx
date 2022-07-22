import { Trash } from 'phosphor-react'
import { useState } from 'react';

import styles from './Tasks.module.css'

interface TasksProps {
  content: string;
  isComplete: boolean;
  onDeleteTask: (task: string) => void;
  completeTask: () => void;
}

export function Tasks({ content, isComplete, onDeleteTask, completeTask }: TasksProps) {

  function handleDeleteTask() {
    onDeleteTask(content)
  }

  return (
    <div className={styles.taskBox}>
      <input
        type="checkbox"
        readOnly
        checked={isComplete}
        onClick={completeTask}
      />

      <span className={isComplete === true ? styles.completed : ''}>{content}</span>
      <button
        onClick={handleDeleteTask}
        type="button"
      >
        <Trash size={20} />
      </button>
    </div>
  )
}