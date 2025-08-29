import { motion } from 'framer-motion'

import { useDeviceType } from '@shared/hooks/useDeviceType.ts'
import { useSwipeAction } from '@shared/hooks/useSwipeAction.ts'

import type { Task } from '@entities/task/model/task.types.ts'

import { CompleteTask } from '@features/to-do/complete-task/ui/complete-task.tsx'
import { DeleteTask } from '@features/to-do/delete-task/ui/delete-task.tsx'
import { EditableTaskView } from '@features/to-do/edit-task/ui/edit-task-view.tsx'
import { EditTask } from '@features/to-do/edit-task/ui/edit-task.tsx'
import { useTaskActions } from '@features/to-do/task-actions/model/task-actions-context.tsx'

interface Props {
  task: Partial<Task>
  isEditing: boolean
}

export const TaskItem = ({ task, isEditing }: Props) => {
  const { onDelete, onEdit, onComplete, onCancel, onSave } = useTaskActions()
  const deviceType = useDeviceType()

  const { bind } = useSwipeAction({
    threshold: 100,
    enabled: deviceType === 'mobile',
    onSwipeLeft: () => onDelete(task.id!),
  })

  const checked = task.isCompleted!

  return (
    <motion.div {...bind}>
      <EditableTaskView
        task={task}
        mode={isEditing ? 'edit' : 'view'}
        onCancel={onCancel}
        onSave={onSave}
      />
      <DeleteTask
        taskId={task.id!}
        onDeleteTask={onDelete}
        style={{ position: 'absolute', right: 0, top: 0 }}
      />
      <EditTask
        id={task.id!}
        style={{ position: 'absolute', right: 0, bottom: 0 }}
        onEditTask={onEdit}
        disabled={isEditing || checked}
      />
      <CompleteTask
        id={task.id!}
        style={{ position: 'absolute', left: 0, top: -8 }}
        onComplete={onComplete}
        checked={checked}
        disabled={isEditing}
      />
    </motion.div>
  )
}
