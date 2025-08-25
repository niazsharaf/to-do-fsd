import type { Task } from '@entities/task/model/task.types.ts'

import styles from './task-card.module.css'

interface Props {
  task: Partial<Task>
}

export const TaskCard = ({ task }: Props) => {
  return (
    <div className={styles.card} key={task.id}>
      <h3 className={styles.title} title={task.title}>
        {task.title}
      </h3>
      <p className={styles.desc} title={task.description}>
        {task.description ?? ' '}
      </p>
    </div>
  )
}
