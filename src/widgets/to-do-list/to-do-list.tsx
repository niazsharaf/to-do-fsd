import { RenderItems } from '@shared/components/render-items.tsx'
import { ScroolableItems } from '@shared/components/scrollable-items.tsx'
import { useDragReorder } from '@shared/hooks/useDragReorder.tsx'
import { useTasks } from '@shared/hooks/useTasks.tsx'

import { AddTaskForm } from '@features/to-do/add-task/ui/add-task-form.tsx'
import { TaskActionsContext } from '@features/to-do/task-actions/model/task-actions-context.tsx'

import { TaskItem } from '@widgets/to-do-list/ui/task-item.tsx'

import styles from './to-do-list.module.css'

export const ToDoList = () => {
  const { tasks, deleteTask, addTask, setTasks, editingTaskId, cancelEdit, startEdit, saveTask } =
    useTasks()

  const { getDragProps } = useDragReorder(setTasks, (t) => t.id!)

  return (
    <div className={styles.container}>
      <AddTaskForm onTaskAdded={addTask} />
      <ScroolableItems height={550}>
        <TaskActionsContext value={{ onDeleteTask: deleteTask, onEditTask: startEdit }}>
          <RenderItems
            items={tasks}
            isLoading={false}
            render={(task) => {
              return (
                <div {...getDragProps(task.id!)} className={styles.dndItem}>
                  <TaskItem
                    task={task}
                    onCancel={cancelEdit}
                    isEditing={editingTaskId === task.id}
                    onSave={saveTask}
                  />
                </div>
              )
            }}
          />
        </TaskActionsContext>
      </ScroolableItems>
    </div>
  )
}
