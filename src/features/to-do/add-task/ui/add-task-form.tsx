import { type FormEventHandler } from 'react'

import { useForm } from '@shared/hooks/useForm.tsx'
import { isEmpty } from '@shared/lib/isEmpty.ts'
import { Input, Button } from '@shared/ui'

import type { Task } from '@entities/task/model/task.types.ts'

import styles from './add-task-form.module.scss'

interface Props {
  onTaskAdded: (task: Partial<Task>) => void
}

export const AddTaskForm = ({ onTaskAdded }: Props) => {
  const { values, bind, reset } = useForm({ title: '', description: '' })

  const submit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    onTaskAdded({
      title: values.title,
      description: values.description,
      createdAt: new Date(),
      isCompleted: false,
      id: crypto.randomUUID(),
    })
    reset()
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input {...bind('title')} label="Мне нужно сделать" required />
      <Input {...bind('description')} label="Описание" />

      <Button type="submit" disabled={isEmpty(values)} variant={'primary'}>
        Добавить
      </Button>
    </form>
  )
}
