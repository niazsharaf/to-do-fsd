import { Outlet } from 'react-router-dom'

import { Footer } from '@widgets/footer'
import { Header } from '@widgets/header'

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
