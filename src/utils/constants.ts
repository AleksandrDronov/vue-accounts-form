// Константы для типов аккаунтов и других литералов

export const ACCOUNT_TYPE_LDAP = 'LDAP';
export const ACCOUNT_TYPE_LOCAL = 'local';

export const ACCOUNT_TYPE_LABELS = [
  { value: ACCOUNT_TYPE_LDAP, label: 'LDAP' },
  { value: ACCOUNT_TYPE_LOCAL, label: 'Локальная' },
];

export const STORAGE_KEY = 'accounts-data';
