import React from 'react'

import s from '../ui/scrollable-items/scrollable-items.module.scss'

type Props = {
  height?: number
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}

export const ScroolableItems: React.FC<Props> = ({ height = 300, className, style, children }) => {
  return (
    <div className={[s.root, className].filter(Boolean).join(' ')} style={{ ...style, height }}>
      {children}
    </div>
  )
}
