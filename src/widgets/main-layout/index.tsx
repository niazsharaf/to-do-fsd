import { Outlet } from 'react-router-dom'
import { Header } from '@widgets/header'
import { Footer } from '@widgets/footer'

import styles from './styles.module.scss'

export function MainLayout() {
  return (
    <div className={styles.root}>
      <Header />
      <main className={styles.content}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
