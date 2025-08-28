import { Input } from '@shared/ui'

import type { CSSProperties } from 'react'

interface Props {
  id: string
  onComplete: (task: string) => void
  style?: CSSProperties
  checked: boolean
  disabled: boolean
}

export const CompleteTask = ({ id, style, checked, onComplete, disabled }: Props) => {
  return (
    <span style={style}>
      <Input
        type="checkbox"
        checked={checked}
        onChange={() => onComplete(id)}
        variant={'text'}
        disabled={disabled}
      />
    </span>
  )
}
