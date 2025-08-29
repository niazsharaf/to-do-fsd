import { useMotionValue, animate, useTransform, type MotionProps } from 'framer-motion'

interface UseSwipeActionOptions {
  threshold?: number
  rotateThreshold?: number
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  enabled?: boolean
}

export const useSwipeAction = ({
  threshold = 100,
  rotateThreshold = 20,
  onSwipeLeft,
  onSwipeRight,
  enabled = true,
}: UseSwipeActionOptions) => {
  const x = useMotionValue(0)

  const canSwipeLeft = !!onSwipeLeft
  const canSwipeRight = !!onSwipeRight

  const rotate = useTransform(x, (latest) => {
    if (Math.abs(latest) < rotateThreshold) return 0
    if (latest < 0 && canSwipeLeft) return -2
    if (latest > 0 && canSwipeRight) return 2
    return 0
  })

  const bind: MotionProps = {
    drag: enabled ? 'x' : false,
    dragConstraints: enabled
      ? {
          left: canSwipeLeft ? -150 : 0,
          right: canSwipeRight ? 150 : 0,
        }
      : undefined,
    style: { x, rotate, position: 'relative', touchAction: 'pan-y' },
    whileDrag:
      enabled && (onSwipeLeft || onSwipeRight)
        ? { backgroundColor: '#fcdcdc', rotate: -2 }
        : undefined,
    transition: { type: 'spring', stiffness: 300, damping: 30 },
    dragElastic: 0,
    onDragEnd:
      enabled && (onSwipeLeft || onSwipeRight)
        ? (_: any, info: any) => {
            if (onSwipeLeft && info.offset.x < -threshold) {
              onSwipeLeft()
            } else if (onSwipeRight && info.offset.x > threshold) {
              onSwipeRight()
            } else {
              animate(x, 0, { type: 'spring', stiffness: 300, damping: 30 })
            }
          }
        : undefined,
  }

  return { bind }
}
