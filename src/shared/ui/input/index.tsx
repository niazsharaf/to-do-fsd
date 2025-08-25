import React, { forwardRef, useId } from 'react'

import s from './input.module.css'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  variant?: 'primary' | 'text'
  fullWidth?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, id: idProp, variant = 'primary', fullWidth = true, className, ...props },
  ref,
) {
  const autoId = useId()
  const id = idProp ?? `inp-${autoId}`

  const inputCls = [s.input, s[variant]].join(' ')
  const wrapCls = [s.wrap, fullWidth ? s.full : '', className].filter(Boolean).join(' ')

  return (
    <div className={wrapCls}>
      <input id={id} ref={ref} className={inputCls} placeholder=" " {...props} />
      <label className={s.label} htmlFor={id}>
        {label}
        {props.required ? '*' : ''}
      </label>
    </div>
  )
})
