import React, { forwardRef } from 'react'

import s from './button.module.css'

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'text'
  fullWidth?: boolean
  ariaLabel?: string
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', ariaLabel = 'button', fullWidth = false, className, ...props },
  ref,
) {
  const cls = [s.btn, s[variant], fullWidth ? s.block : '', className].filter(Boolean).join(' ')
  return <button aria-label={ariaLabel} ref={ref} className={cls} {...props} />
})
