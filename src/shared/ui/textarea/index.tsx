import React, { forwardRef } from 'react'

import styles from './textarea.module.css'

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  variant?: 'primary' | 'text'
  fullWidth?: boolean
  resizable?: boolean
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { variant = 'primary', fullWidth = true, resizable = true, className, ...props },
  ref,
) {
  const cls = [
    styles.textarea,
    styles[variant],
    fullWidth ? styles.full : '',
    !resizable ? styles.noResize : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <textarea ref={ref} className={cls} {...props} />
})
