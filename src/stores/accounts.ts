import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { Account, AccountFormData } from '../types/account'
import { STORAGE_KEY } from '../utils/constants'
import { generateId, parseLabels, labelsToString } from '../utils/helpers'
import { useLocalStorage } from '../composables/useLocalStorage'

export const useAccountsStore = defineStore('accounts', () => {
  // Работа с localStorage через хук
  const { load, save } = useLocalStorage<Account[]>(STORAGE_KEY)

  // Состояние
  const accounts = ref<Account[]>(load() || [])

  // Следим за изменениями и сохраняем в localStorage
  watch(
    accounts,
    (newAccounts) => {
      save(newAccounts)
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
