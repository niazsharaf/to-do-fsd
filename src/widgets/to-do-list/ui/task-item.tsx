import type { Task } from '@entities/task/model/task.types.ts'

import { DeleteTask } from '@features/to-do/delete-task/ui/delete-task.tsx'
import { EditableTaskView } from '@features/to-do/edit-task/ui/edit-task-view.tsx'
import { EditTask } from '@features/to-do/edit-task/ui/edit-task.tsx'
import { useTaskActions } from '@features/to-do/task-actions/model/task-actions-context.tsx'

export const TaskItem = ({
  task,
  isEditing,
  onCancel,
  onSave,
}: {
  task: Partial<Task>
  isEditing: boolean
  onSave: (task: Partial<Task>) => void
  onCancel: () => void
}) => {
  const { onDeleteTask, onEditTask } = useTaskActions()

  return (
    <>
      <div style={{ position: 'relative' }}>
        <EditableTaskView
          task={task}
          mode={isEditing ? 'edit' : 'view'}
          onCancel={onCancel}
          onSave={onSave}
        />
        <DeleteTask
          taskId={task.id!}
          onDeleteTask={onDeleteTask}
          style={{ position: 'absolute', right: 0, bottom: 0 }}
        />
        <EditTask
          id={task.id!}
          style={{ position: 'absolute', right: 0, top: 0 }}
          onEditTask={onEditTask}
          disabled={isEditing}
        />
      </div>
    </>
  )
}
