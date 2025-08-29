import { useMemo } from 'react'

import { ContextMenu } from '@shared/components/context-menu.tsx'
import { RenderItems } from '@shared/components/render-items.tsx'
import { ScrollableItems } from '@shared/components/scrollable-items/scrollable-items.tsx'
import { useDeviceType } from '@shared/hooks/useDeviceType.ts'
import { useDragReorder } from '@shared/hooks/useDragReorder.tsx'
import { Button } from '@shared/ui'

import { AddTaskForm } from '@features/to-do/add-task/ui/add-task-form.tsx'
import { TaskActionsContext } from '@features/to-do/task-actions/model/task-actions-context.tsx'
import { useTasks } from '@features/to-do/task-actions/model/useTasks.tsx'

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

  const deviceType = useDeviceType()

  const { getDragProps } = useDragReorder(setTasks, (t) => t.id!, {
    enableTouch: deviceType === 'mobile',
  })

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
      <ScrollableItems>
        <TaskActionsContext
          value={{
            onDelete: deleteTask,
            onEdit: startEdit,
            onComplete: startComplete,
            onSave: saveTask,
            onCancel: cancelEdit,
          }}
        >
          <RenderItems
            items={tasks}
            isLoading={false}
            getKey={(task) => task.id!}
            render={(task) => (
              <div {...getDragProps(task.id!)} className={styles.dndItem}>
                <TaskItem task={task} isEditing={editingTaskId === task.id} />
              </div>
            )}
          />
        </TaskActionsContext>
      </ScrollableItems>
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
