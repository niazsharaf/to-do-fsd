import { useMemo } from 'react'

import { ContextMenu } from '@shared/components/context-menu.tsx'
import { RenderItems } from '@shared/components/render-items.tsx'
import { ScroolableItems } from '@shared/components/scrollable-items.tsx'
import { useDragReorder } from '@shared/hooks/useDragReorder.tsx'
import { useTasks } from '@shared/hooks/useTasks.tsx'
import { Button } from '@shared/ui'

import { AddTaskForm } from '@features/to-do/add-task/ui/add-task-form.tsx'
import { TaskActionsContext } from '@features/to-do/task-actions/model/task-actions-context.tsx'

import { TaskItem } from '@widgets/to-do-list/ui/task-item.tsx'

import styles from './to-do-list.module.css'

export const ToDoList = () => {
  const {
    tasks,
    deleteTask,
    addTask,
    setTasks,
    editingTaskId,
    cancelEdit,
    startEdit,
    saveTask,
    startComplete,
    deleteCompetedTask,
  } = useTasks()

  const { getDragProps } = useDragReorder(setTasks, (t) => t.id!)

  const completedTasks = useMemo(
    () =>
      tasks.reduce((acc, task) => {
        return acc + (task.isCompleted ? 1 : 0)
      }, 0),
    [tasks],
  )

  return (
    <div className={styles.container}>
      <AddTaskForm onTaskAdded={addTask} />
      <ScroolableItems height={550}>
        <TaskActionsContext
          value={{
            onDeleteTask: deleteTask,
            onEditTask: startEdit,
            onComplete: startComplete,
          }}
        >
          <RenderItems
            items={tasks}
            isLoading={false}
            getKey={(task) => task.id!}
            render={(task) => (
              <div {...getDragProps(task.id!)} className={styles.dndItem}>
                <TaskItem
                  task={task}
                  onCancel={cancelEdit}
                  isEditing={editingTaskId === task.id}
                  onSave={saveTask}
                />
              </div>
            )}
          />
        </TaskActionsContext>
      </ScroolableItems>
      <ContextMenu isVisible={!!completedTasks}>
        <Button
          variant={'primary'}
          fullWidth={true}
          onClick={deleteCompetedTask}
          ariaLabel={'Delete'}
        >
          Удалить выбранные ({completedTasks})
        </Button>
      </ContextMenu>
    </div>
  )
}
