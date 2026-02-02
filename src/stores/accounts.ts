import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { Account, AccountFormData, LabelItem } from '../types/account'

const STORAGE_KEY = 'accounts-data'

// Генерация уникального ID
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

// Парсинг строки меток в массив объектов
export const parseLabels = (labelText: string): LabelItem[] => {
  if (!labelText.trim()) return []

  return labelText
    .split(';')
    .map((item) => item.trim())
    .filter((item) => item.length > 0)
    .map((text) => ({ text }))
}

// Преобразование массива меток обратно в строку
export const labelsToString = (labels: LabelItem[]): string => {
  return labels.map((item) => item.text).join('; ')
}

export const useAccountsStore = defineStore('accounts', () => {
  // Загрузка данных из localStorage
  const loadFromStorage = (): Account[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEY)
      if (data) {
        return JSON.parse(data)
      }
    } catch (e) {
      console.error('Ошибка загрузки из localStorage:', e)
    }
    return []
  }

  // Сохранение данных в localStorage
  const saveToStorage = (accounts: Account[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts))
    } catch (e) {
      console.error('Ошибка сохранения в localStorage:', e)
    }
  }

  // Состояние
  const accounts = ref<Account[]>(loadFromStorage())

  // Следим за изменениями и сохраняем в localStorage
  watch(
    accounts,
    (newAccounts) => {
      saveToStorage(newAccounts)
    },
    { deep: true }
  )

  // Добавление новой пустой учетной записи
  const addAccount = (): string => {
    const newAccount: Account = {
      id: generateId(),
      label: [],
      type: 'local',
      login: '',
      password: '',
    }
    accounts.value.push(newAccount)
    return newAccount.id
  }

  // Удаление учетной записи
  const removeAccount = (id: string) => {
    const index = accounts.value.findIndex((acc) => acc.id === id)
    if (index !== -1) {
      accounts.value.splice(index, 1)
    }
  }

  // Обновление учетной записи
  const updateAccount = (formData: AccountFormData) => {
    const index = accounts.value.findIndex((acc) => acc.id === formData.id)
    if (index !== -1) {
      const account = accounts.value[index]
      account.label = parseLabels(formData.labelText)
      account.type = formData.type
      account.login = formData.login
      // Пароль null для LDAP, иначе значение из формы
      account.password = formData.type === 'LDAP' ? null : formData.password
    }
  }

  // Преобразование Account в AccountFormData
  const toFormData = (account: Account): AccountFormData => {
    return {
      id: account.id,
      labelText: labelsToString(account.label),
      type: account.type,
      login: account.login,
      password: account.password || '',
    }
  }

  return {
    accounts,
    addAccount,
    removeAccount,
    updateAccount,
    toFormData,
  }
})
