import React from 'react'

import s from './scrollable-items.module.scss'

type Props = {
  children: React.ReactNode
  height?: number | string
  maxHeight?: number | string
  className?: string
  style?: React.CSSProperties
}

export const ScrollableItems: React.FC<Props> = ({
  height = 300,
  maxHeight = '70vh',
  className,
  style,
  children,
}) => {
  return (
    <div
      className={[s.root, className].filter(Boolean).join(' ')}
      style={{ ...style, maxHeight, height }}
    >
      {children}
    </div>
  )
}
