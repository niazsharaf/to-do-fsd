import { useRef } from 'react'

import { useForm } from '@shared/hooks/useForm.tsx'
import { Input } from '@shared/ui'

import type { Task } from '@entities/task/model/task.types.ts'

import styles from './task-card.module.css'

interface Props {
  task: Partial<Task>
  onSave: (task: Partial<Task>) => void
  onCancel: () => void
  isEditing: boolean
}

export const EditTaskCard = ({ task, onSave, onCancel, isEditing }: Props) => {
  const { values, bind, reset } = useForm({
    title: task.title ?? '',
    description: task.description ?? '',
    updatedAt: new Date(),
  })

  const wrapperRef = useRef<HTMLDivElement>(null)

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      onSave({ id: task.id!, ...values })
    }
    if (e.key === 'Escape') {
      e.preventDefault()
      onCancel()
      reset()
    }
  }

  const handleBlur = () => {
    setTimeout(() => {
      if (wrapperRef.current && !wrapperRef.current.contains(document.activeElement)) {
        onSave({ id: task.id!, ...values })
      }
    }, 0)
  }

  const cardStyle = isEditing ? `${styles.card} ${styles.isEditing}` : styles.card

  return (
    <div ref={wrapperRef} className={cardStyle} onBlur={handleBlur}>
      <Input
        {...bind('title')}
        onKeyDown={handleKey}
        variant={'text'}
        autoFocus={true}
        className={styles.card_title}
      />
      <Input
        {...bind('description')}
        onKeyDown={handleKey}
        className={styles.card_desc}
        variant={'text'}
      />
    </div>
  )
}
