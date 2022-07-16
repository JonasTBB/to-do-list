import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'
import { ClipboardText, PlusCircle } from 'phosphor-react'
import { Tasks } from './Tasks'

import styles from './TaskBorder.module.css'

export function TaskBorder() {
  const [tasks, setTasks] = useState([
    'Nova tarefa'
  ])

  const [newTask, setNewTask] = useState('')


  function handleCreateNewTak(event: FormEvent) {
    event.preventDefault()

    setTasks([...tasks, newTask])
    setNewTask('')
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('')
    setNewTask(event.target.value)
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('Esse campo e obrigatório')
  }

  function deleteTask(taskToDelete: string) {
    const tasksWithoutDeletedOne = tasks.filter(task => {
      return task !== taskToDelete
    })

    setTasks(tasksWithoutDeletedOne)
  }

  return (
    <>
      <form
        onSubmit={handleCreateNewTak}
        className={styles.taskForm}
      >
        <textarea
          name='comment'
          placeholder='Adicione uma nova tarefa'
          value={newTask}
          onChange={handleNewTaskChange}
          onInvalid={handleNewTaskInvalid}
          required
        />
        <button
          type='submit'
        >
          Criar
          <PlusCircle weight='bold' />
        </button>
      </form>

      <header className={styles.headerBox}>
        <div className={styles.createdTasks}>
          <p>Tarefas criadas</p>
          <span>{tasks.length}</span>
        </div>
        <div className={styles.completedTasks}>
          <p>concluídas</p>
          <span>0</span>
        </div>
      </header>

      <main className={styles.mainBox}>
        <ClipboardText size={56} weight="thin" />
        <span>Você ainda não tem tarefas cadastradas
          <br />
          Crie tarefas e organize seus itens a fazer
        </span>
        {tasks.map(task => {
          return (
            <Tasks
              id={task}
              content={task}
              onDeleteTask={deleteTask}
            />
          )
        })}
      </main>
    </>
  )
}