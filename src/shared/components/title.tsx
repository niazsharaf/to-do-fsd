import styles from '../styles/title.module.css'

interface Props {
  text: string
}

export const Title = ({ text }: Props) => {
  return <span className={styles.title}>{text}</span>
}
