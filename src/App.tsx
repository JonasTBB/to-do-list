import { Header } from './components/Header'
import { TaskBorder } from './components/TaskBorder'

import styles from './App.module.css'

import './global.css'

export function App() {
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <TaskBorder />
      </div>
    </>
  )
}