import { useRef, useState, useCallback } from 'react'

type Id = string | number
type Pos = 'before' | 'after'
type Hover = { id: Id; pos: Pos } | null

export function useDragReorder<T>(
  setItems: React.Dispatch<React.SetStateAction<T[]>>,
  getId: (item: T) => Id,
) {
  const dragIdRef = useRef<Id | null>(null)
  const [draggingId, setDraggingId] = useState<Id | null>(null)
  const [hover, setHover] = useState<Hover>(null)

  const onDragStart = useCallback(
    (id: Id) => (e: React.DragEvent) => {
      dragIdRef.current = id
      setDraggingId(id)
      e.dataTransfer.effectAllowed = 'move'
    },
    [],
  )

  const onDragOver = useCallback(
    (overId: Id) => (e: React.DragEvent) => {
      e.preventDefault()
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
      const isBefore = e.clientY < rect.top + rect.height / 2
      const next: Hover = { id: overId, pos: isBefore ? 'before' : 'after' }
      setHover((h) => (h?.id !== next.id || h.pos !== next.pos ? next : h))
      e.dataTransfer.dropEffect = 'move'
    },
    [],
  )

  const onDragLeave = useCallback(() => {
    setHover(null)
  }, [])

  const onDrop = useCallback(
    (overId: Id) => (e: React.DragEvent) => {
      e.preventDefault()
      const fromId = dragIdRef.current
      if (fromId == null) return

      setItems((prev) => {
        const from = prev.findIndex((it) => getId(it) === fromId)
        if (from < 0) return prev

        let insertAt: number
        if (hover && hover.id === overId) {
          const to = prev.findIndex((it) => getId(it) === overId)
          if (to < 0) return prev
          insertAt = to + (hover.pos === 'after' ? 1 : 0)
        } else {
          const to = prev.findIndex((it) => getId(it) === overId)
          if (to < 0) return prev
          insertAt = to
        }

        const next = [...prev]
        const [moved] = next.splice(from, 1)
        if (from < insertAt) insertAt -= 1
        next.splice(insertAt, 0, moved)
        return next
      })

      dragIdRef.current = null
      setDraggingId(null)
      setHover(null)
    },
    [getId, hover, setItems],
  )

  const getDragProps = useCallback(
    (id: Id) => {
      const isOverTop = hover?.id === id && hover.pos === 'before'
      const isOverBottom = hover?.id === id && hover.pos === 'after'
      const isDragging = draggingId === id
      const isDropTarget = hover?.id === id && draggingId !== id

      return {
        draggable: true,
        onDragStart: onDragStart(id),
        onDragOver: onDragOver(id),
        onDragLeave,
        onDrop: onDrop(id),
        'data-drop-target': isDropTarget || undefined,
        'data-drag-over-top': isOverTop || undefined,
        'data-drag-over-bottom': isOverBottom || undefined,
        'data-dragging': isDragging || undefined,
        style: { cursor: 'grab' } as React.CSSProperties,
      }
    },
    [draggingId, hover, onDragLeave, onDragOver, onDragStart, onDrop],
  )

  return { getDragProps }
}
