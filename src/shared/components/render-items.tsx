import React from 'react'

type Props<T> = {
  items: readonly T[]
  render: (item: T, index: string) => React.ReactNode
  getKey: (item: T) => string
  emptyText?: string
  isLoading?: boolean
}

export function RenderItems<T>({ items, render, isLoading, emptyText, getKey }: Props<T>) {
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

  const content = items.map((item) => <React.Fragment>{render(item, getKey(item))}</React.Fragment>)

  return <>{content}</>
}
