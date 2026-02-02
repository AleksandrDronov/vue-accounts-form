// Тип для элемента метки
export interface LabelItem {
  text: string
}

// Тип записи
export type AccountType = 'LDAP' | 'local'

// Интерфейс учетной записи для хранения
export interface Account {
  id: string
  label: LabelItem[]
  type: AccountType
  login: string
  password: string | null
}

// Интерфейс для формы (с полем метки как строка)
export interface AccountFormData {
  id: string
  labelText: string
  type: AccountType
  login: string
  password: string
}

// Интерфейс для ошибок валидации
export interface ValidationErrors {
  login: boolean
  password: boolean
}
