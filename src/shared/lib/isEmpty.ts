export function isEmpty(value: unknown): boolean {
  if (value == null) return true

  if (typeof value === 'string') {
    return value.trim().length === 0
  }

  if (Array.isArray(value)) {
    return value.length === 0 || value.every(isEmpty)
  }

  if (value instanceof Map) {
    if (value.size === 0) return true
    for (const v of value.values()) if (!isEmpty(v)) return false
    return true
  }

  if (value instanceof Set) {
    if (value.size === 0) return true
    for (const v of value.values()) if (!isEmpty(v)) return false
    return true
  }

  if (Object.prototype.toString.call(value) === '[object Object]') {
    const obj = value as Record<string, unknown>
    const keys = Object.keys(obj)
    if (keys.length === 0) return true
    return keys.every((k) => isEmpty(obj[k]))
  }

  return false
}
