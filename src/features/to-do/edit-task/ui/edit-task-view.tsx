import type { Task } from '@entities/task/model/task.types'
import { EditTaskCard } from '@entities/task/ui/edit-task.tsx'
import { TaskCard } from '@entities/task/ui/task-card'

type editMode = {
  edit: 'edit'
  view: 'view'
}

type Props = {
  task: Partial<Task>
  mode: keyof editMode
  onSave: (task: Partial<Task>) => void
  onCancel: () => void
}

export const EditableTaskView = ({ task, mode, onSave, onCancel }: Props) => {
  const taskViewMode = {
    view: <TaskCard task={task} />,
    edit: (
      <EditTaskCard task={task} isEditing={mode === 'edit'} onCancel={onCancel} onSave={onSave} />
    ),
  }

  return taskViewMode[mode]
}
