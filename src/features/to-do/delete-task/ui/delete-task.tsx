import { Trash2 } from 'lucide-react'

import { Button } from '@shared/ui'

import type { CSSProperties } from 'react'

type Props = {
  taskId: string
  onDeleteTask: (taskId: string) => void
  style?: CSSProperties
}

export const DeleteTask = ({ taskId, onDeleteTask, style }: Props) => {
  return (
    <div style={style}>
      <Button variant={'text'} onClick={() => onDeleteTask(taskId)}>
        <Trash2 size={16} />
      </Button>
    </div>
  )
}
