import React, { forwardRef } from 'react'

import s from './button.module.css'

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'text'
  block?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', block = false, className, ...props },
  ref,
) {
  const cls = [s.btn, s[variant], block ? s.block : '', className].filter(Boolean).join(' ')
  return <button ref={ref} className={cls} {...props} />
})
