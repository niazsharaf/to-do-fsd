import { Title } from '@shared/components/title.tsx'

import { ToDoList } from '@widgets/to-do-list/to-do-list.tsx'

import styles from './styles.module.css'

export function HomePage() {
  return (
    <div className={styles.container}>
      <Title text={'Список дел'} />
      <ToDoList />
    </div>
  )
}
