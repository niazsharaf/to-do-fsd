import { useContext, createContext } from 'react'

import type { Task } from '@entities/task/model/task.types.ts'

type TaskActionsContext = {
  onDelete: (taskId: string) => void
  onEdit: (taskId: string) => void
  onComplete: (taskId: string) => void
  onSave: (task: Partial<Task>) => void
  onCancel: () => void
}

export const TaskActionsContext = createContext<TaskActionsContext | null>(null)

export const useTaskActions = () => {
  const context = useContext(TaskActionsContext)

  if (!context) {
    throw new Error('useTaskActions must be used within TaskActionsProvider')
  }

  return context
}
