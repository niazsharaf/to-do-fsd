import { type ChangeEvent, useState } from 'react'

type InputEl = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement

export function useForm<T extends Record<string, any>>(initial: T) {
  const [values, setValues] = useState<T>(initial)

  const handleChange = (e: ChangeEvent<InputEl>) => {
    const t = e.target as HTMLInputElement
    const value =
      t.type === 'checkbox' ? t.checked : t.type === 'file' ? (t.files ?? null) : t.value
    setValues((v) => ({ ...v, [t.name]: value }))
  }

  const bind = <K extends keyof T>(name: K) => ({
    name: String(name),
    value: values[name] ?? '',
    onChange: handleChange,
  })

  const reset = () => setValues(initial)

  return { values, setValues, handleChange, bind, reset }
}
