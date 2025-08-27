import styles from '../styles/context-menu.module.css'

interface Props {
  isVisible: boolean
  children?: React.ReactNode
}

export const ContextMenu = ({ isVisible = false, children }: Props) => {
  return isVisible ? <div className={styles['context-menu']}>{children}</div> : null
}
