<script setup lang="ts">
  import { ref, watch, computed } from 'vue'
  import { ElInput, ElSelect, ElOption, ElButton } from 'element-plus'
  import { Delete } from '@element-plus/icons-vue'
  import type { Account, AccountFormData, ValidationErrors } from '../types/account'
  import { useAccountsStore } from '../stores/accounts'
  import { ACCOUNT_TYPE_LABELS, ACCOUNT_TYPE_LDAP, ACCOUNT_TYPE_LOCAL } from '../utils/constants'
  import { validateAccountForm } from '../utils/validation'

  const props = defineProps<{
    account: Account
  }>()

  const emit = defineEmits<{
    remove: [id: string]
  }>()

  const store = useAccountsStore()

  // Локальное состояние формы
  const formData = ref<AccountFormData>(store.toFormData(props.account))

  // Ошибки валидации
  const errors = ref<ValidationErrors>({
    login: false,
    password: false,
  })

  // Показывать ли поле пароля
  const showPassword = computed(() => formData.value.type === ACCOUNT_TYPE_LOCAL)

  // Варианты типа записи
  const typeOptions = ACCOUNT_TYPE_LABELS

  // Синхронизация при изменении props
  watch(
    () => props.account,
    (newAccount) => {
      formData.value = store.toFormData(newAccount)
    },
    { deep: true }
  )

  // Валидация формы
  const validate = (): boolean => {
    const result = validateAccountForm(formData.value)
    errors.value.login = result.login
    errors.value.password = result.password
    return !result.login && !result.password
  }

  // Сохранение при потере фокуса
  const handleBlur = () => {
    if (validate()) {
      store.updateAccount(formData.value)
    }
  }

  // Обработка изменения типа
  const handleTypeChange = () => {
    // Если переключились на LDAP, очищаем ошибку пароля
    if (formData.value.type === ACCOUNT_TYPE_LDAP) {
      errors.value.password = false
    }

    if (validate()) {
      store.updateAccount(formData.value)
    }
  }

  // Удаление записи
  const handleRemove = () => {
    emit('remove', props.account.id)
  }
</script>

<template>
  <article class="account-item" :aria-label="`Учетная запись ${formData.login || 'без имени'}`">
    <div class="account-field">
      <label :for="`label-${account.id}`" class="visually-hidden">Метка</label>
      <el-input
        :id="`label-${account.id}`"
        v-model="formData.labelText"
        placeholder="Введите метки через ;"
        maxlength="50"
        show-word-limit
        class="account-input"
        aria-describedby="label-hint"
        @blur="handleBlur"
      />
    </div>

    <div class="account-field">
      <label :for="`type-${account.id}`" class="visually-hidden">Тип записи</label>
      <el-select
        :id="`type-${account.id}`"
        v-model="formData.type"
        placeholder="Тип записи"
        class="account-select"
        @change="handleTypeChange"
      >
        <el-option
          v-for="option in typeOptions"
          :key="option.value"
          :label="option.label"
          :value="option.value"
        />
      </el-select>
    </div>

    <div class="account-field">
      <label :for="`login-${account.id}`" class="visually-hidden">Логин</label>
      <el-input
        :id="`login-${account.id}`"
        v-model="formData.login"
        placeholder="Логин"
        maxlength="100"
        :class="{ 'is-error': errors.login }"
        :aria-invalid="errors.login"
        class="account-input"
        autocomplete="username"
        @blur="handleBlur"
      />
    </div>

    <div v-if="showPassword" class="account-field">
      <label :for="`password-${account.id}`" class="visually-hidden">Пароль</label>
      <el-input
        :id="`password-${account.id}`"
        v-model="formData.password"
        type="password"
        placeholder="Пароль"
        maxlength="100"
        show-password
        :class="{ 'is-error': errors.password }"
        :aria-invalid="errors.password"
        class="account-input"
        autocomplete="new-password"
        @blur="handleBlur"
      />
    </div>
    <div v-else class="account-field password-placeholder" aria-hidden="true">
      <span class="password-hidden-text">—</span>
    </div>

    <div class="account-actions">
      <el-button
        type="danger"
        :icon="Delete"
        circle
        :aria-label="`Удалить учетную запись ${formData.login || ''}`"
        @click="handleRemove"
      />
    </div>
  </article>
</template>

<style scoped>
  .account-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    margin-bottom: 12px;
  }

  .account-field {
    flex: 1;
    min-width: 0;
  }

  .account-field:first-child {
    flex: 1.5;
  }

  .account-select {
    width: 100%;
  }

  .account-input {
    width: 100%;
  }

  .account-actions {
    flex-shrink: 0;
  }

  .password-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .password-hidden-text {
    color: #909399;
    font-size: 14px;
  }

  :deep(.is-error .el-input__wrapper) {
    box-shadow: 0 0 0 1px #f56c6c inset !important;
  }

  :deep(.el-input__wrapper) {
    transition: box-shadow 0.2s;
  }

  /* Скрытый визуально, но доступный для скринридеров */
  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
</style>
