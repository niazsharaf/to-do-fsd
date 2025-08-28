import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

type Props<T> = {
  items: readonly T[]
  render: (item: T, index: string | number) => React.ReactNode
  getKey: (item: T, index: string | number) => string
  emptyText?: string
  isLoading?: boolean
  withAnimation?: boolean
}

export function RenderItems<T>({
  items,
  render,
  isLoading,
  emptyText,
  getKey,
  withAnimation = true,
}: Props<T>) {
  if (isLoading) {
    return (
      <span
        style={{
          display: 'flex',
          fontSize: '16px',
          alignItems: 'center',
          justifyContent: 'center',
          height: '-webkit-fill-available',
        }}
      >
        Загрузка...
      </span>
    )
  }

  if (!items?.length) {
    return (
      <span
        style={{
          fontSize: '16px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '-webkit-fill-available',
          opacity: 0.6,
          margin: '2.5rem 0.5rem',
          transition: 'opacity 0.3s ease',
        }}
      >
        {emptyText ?? 'Нет данных'}
      </span>
    )
  }

  const content = items.map((item, index) => {
    const key = getKey ? getKey(item, index) : index
    const element = render(item, index)

    return withAnimation ? (
      <motion.div
        key={key}
        layout={'position'}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
      >
        {element}
      </motion.div>
    ) : (
      <React.Fragment key={key}>{element}</React.Fragment>
    )
  })

  return <AnimatePresence>{content}</AnimatePresence>
}
