// Валидация для AccountFormData
import type { AccountFormData, ValidationErrors } from '../types/account'
import { ACCOUNT_TYPE_LOCAL } from './constants'

export function validateAccountForm(formData: AccountFormData): ValidationErrors {
  return {
    login: !formData.login.trim(),
    password: formData.type === ACCOUNT_TYPE_LOCAL && !formData.password.trim(),
  }
}
