// Хук для работы с localStorage

export function useLocalStorage<T>(key: string) {
  const load = (): T | null => {
    try {
      const data = localStorage.getItem(key)
      if (data) {
        return JSON.parse(data)
      }
    } catch (e) {
      console.error('Ошибка загрузки из localStorage:', e)
    }
    return null
  }

  const save = (value: T) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      console.error('Ошибка сохранения в localStorage:', e)
    }
  }

  return { load, save }
}
