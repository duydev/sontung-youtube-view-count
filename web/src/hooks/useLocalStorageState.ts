import { useEffect, useState } from 'react'

type Options<T> = {
  serialize?: (_value: T) => string
  deserialize?: (_raw: string) => T
}

export function useLocalStorageState<T>(key: string, initialValue: T, options: Options<T> = {}) {
  const deserialize = options.deserialize ?? ((raw: string) => JSON.parse(raw) as T)

  const [value, setValue] = useState<T>(() => {
    try {
      const raw = window.localStorage.getItem(key)
      if (raw == null) return initialValue
      return deserialize(raw)
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      const serialize = options.serialize ?? ((v: T) => JSON.stringify(v))
      window.localStorage.setItem(key, serialize(value))
    } catch {
      // ignore quota / disabled storage
    }
  }, [key, options.serialize, value])

  return [value, setValue] as const
}
