import { useState } from 'react'

import { useLocalStorage } from '@shared/hooks/useLocalStorage.ts'

import type { Task } from '@entities/task/model/task.types'

export const useTasks = () => {
  const [tasks, setTasks] = useLocalStorage<Array<Partial<Task>>>('tasks', [])

  const [editingTaskId, setEditingTaskId] = useState<string | null>(null)

  const addTask = (task: Partial<Task>) => {
    setTasks((prev) => [task, ...prev])
  }

  const cancelEdit = () => setEditingTaskId(null)

  const saveTask = (task: Partial<Task>) => {
    setTasks((prev) => prev.map((t) => (t.id === task.id ? { ...t, ...task } : t)))
    setEditingTaskId(null)
  }

  const toggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              isCompleted: !t.isCompleted,
              updatedAt: new Date(),
            }
          : t,
      ),
    )
  }

  const startComplete = (task: string) => {
    toggleComplete(task)
  }

  const deleteCompetedTask = () => {
    setTasks((prev) => prev.filter((task) => !task.isCompleted))
  }

  const startEdit = (id: string) => setEditingTaskId(id)

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  return {
    tasks,
    addTask,
    deleteTask,
    setTasks,
    startComplete,
    cancelEdit,
    saveTask,
    startEdit,
    editingTaskId,
    deleteCompetedTask,
  }
}
