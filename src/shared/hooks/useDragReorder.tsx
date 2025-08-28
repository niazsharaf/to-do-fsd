import { useRef, useState, useCallback } from 'react'

type Id = string | number
type Pos = 'before' | 'after'
type Hover = { id: Id; pos: Pos } | null

type Options = {
  enableTouch?: boolean
}

export function useDragReorder<T>(
  setItems: React.Dispatch<React.SetStateAction<T[]>>,
  getId: (item: T) => Id,
  options: Options = {},
) {
  const { enableTouch = false } = options
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

  const commitDrop = useCallback(
    (overId: Id | null) => {
      const fromId = dragIdRef.current
      if (fromId == null) return

      setItems((prev) => {
        const from = prev.findIndex((it) => getId(it) === fromId)
        if (from < 0) return prev

        let insertAt: number
        if (hover && overId != null && hover.id === overId) {
          const to = prev.findIndex((it) => getId(it) === overId)
          if (to < 0) return prev
          insertAt = to + (hover.pos === 'after' ? 1 : 0)
        } else if (overId != null) {
          const to = prev.findIndex((it) => getId(it) === overId)
          if (to < 0) return prev
          insertAt = to
        } else {
          return prev
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

  const onDrop = useCallback(
    (overId: Id) => (e: React.DragEvent) => {
      e.preventDefault()
      commitDrop(overId)
    },
    [commitDrop],
  )

  const onTouchStart = useCallback(
    (id: Id) => () => {
      if (!enableTouch) return
      dragIdRef.current = id
      setDraggingId(id)
    },
    [enableTouch],
  )

  const onTouchMove = useCallback(
    (_id: Id) => (e: React.TouchEvent) => {
      if (!enableTouch) return
      e.preventDefault()
      const touch = e.touches[0]
      if (!touch) return

      const el = document.elementFromPoint(touch.clientX, touch.clientY) as HTMLElement | null
      const overEl = el?.closest('[data-draggable-id]') as HTMLElement | null
      if (!overEl) return

      const overRaw = overEl.getAttribute('data-draggable-id')
      if (!overRaw) return

      const overId: Id = /^\d+$/.test(overRaw) ? Number(overRaw) : overRaw

      const rect = overEl.getBoundingClientRect()
      const isBefore = touch.clientY < rect.top + rect.height / 2
      const next: Hover = { id: overId, pos: isBefore ? 'before' : 'after' }
      setHover((h) => (h?.id !== next.id || h.pos !== next.pos ? next : h))
    },
    [enableTouch],
  )

  const onTouchEnd = useCallback(() => {
    if (!enableTouch) return
    commitDrop(hover?.id ?? null)
  }, [enableTouch, commitDrop, hover?.id])

  const getDragProps = useCallback(
    (id: Id) => {
      const isOverTop = hover?.id === id && hover.pos === 'before'
      const isOverBottom = hover?.id === id && hover.pos === 'after'
      const isDragging = draggingId === id
      const isDropTarget = hover?.id === id && draggingId !== id

      const base: any = {
        'data-draggable-id': String(id),
        'data-drop-target': isDropTarget || undefined,
        'data-drag-over-top': isOverTop || undefined,
        'data-drag-over-bottom': isOverBottom || undefined,
        'data-dragging': isDragging || undefined,
        style: {
          cursor: 'grab',
          touchAction: enableTouch && isDragging ? 'none' : undefined,
        } as React.CSSProperties,
      }

      if (enableTouch) {
        return {
          ...base,
          draggable: false,
          onTouchStart: onTouchStart(id),
          onTouchMove: onTouchMove(id),
          onTouchEnd,
          onTouchCancel: onTouchEnd,
        }
      }

      return {
        ...base,
        draggable: true,
        onDragStart: onDragStart(id),
        onDragOver: onDragOver(id),
        onDragLeave,
        onDrop: onDrop(id),
      }
    },
    [
      draggingId,
      hover,
      enableTouch,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      onDragStart,
      onDragOver,
      onDragLeave,
      onDrop,
    ],
  )

  return { getDragProps }
}
