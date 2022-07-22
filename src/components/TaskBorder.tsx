import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'
import { ClipboardText, PlusCircle } from 'phosphor-react'
import { Tasks } from './Tasks'

import styles from './TaskBorder.module.css'

interface TasksProps {
  content: string;
  isComplete: boolean;
}

export function TaskBorder() {
  const [tasks, setTasks] = useState<TasksProps[]>([
    {
      content: 'Nova Tarefa',
      isComplete: true,
    }
  ])

  const [newTask, setNewTask] = useState('')

  const [isCompleted, setIsCompleted] = useState(false)

  function handleOnCompletedTask() {
    if (isCompleted) {
      setIsCompleted(false);
    } else {
      setIsCompleted(true);
    }
  }


  function handleCreateNewTak(event: FormEvent) {
    event.preventDefault()

    const NewTask: TasksProps = {
      content: newTask,
      isComplete: isCompleted,
    }

    setTasks([...tasks, NewTask])
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
      return task.content !== taskToDelete
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
        {tasks.length === 0 ?
          <>
            <ClipboardText size={56} weight="thin" />
            <span>Você ainda não tem tarefas cadastradas
              <br />
              Crie tarefas e organize seus itens a fazer
            </span>
          </>
          :
          ''
        }
        {tasks.map(task => {
          return (
            <Tasks
              content={task.content}
              isComplete={isCompleted}
              onDeleteTask={deleteTask}
              completeTask={handleOnCompletedTask}
            />
          )
        })}
      </main>
    </>
  )
}