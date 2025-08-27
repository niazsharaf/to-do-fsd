import { useContext, createContext } from 'react'

type TaskActionsContext = {
  onDeleteTask: (taskId: string) => void
  onEditTask: (taskId: string) => void
  onComplete: (taskId: string) => void
}

export const TaskActionsContext = createContext<TaskActionsContext | null>(null)

export const useTaskActions = () => {
  const context = useContext(TaskActionsContext)

  if (!context) {
    throw new Error('useTaskActions must be used within TaskActionsProvider')
  }

  return context
}
