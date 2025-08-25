import { Pencil } from 'lucide-react'

import { Button } from '@shared/ui'

import type { CSSProperties } from 'react'

interface Props {
  id: string
  onEditTask: (task: string) => void
  style?: CSSProperties
  disabled: boolean
}

export const EditTask = ({ id, style, onEditTask, disabled }: Props) => {
  return (
    <span style={style}>
      <Button onClick={() => onEditTask(id)} variant={'text'} disabled={disabled}>
        <Pencil size={16} />
      </Button>
    </span>
  )
}
