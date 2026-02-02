<script setup lang="ts">
  import { computed } from 'vue'
  import { ElButton } from 'element-plus'
  import { Plus } from '@element-plus/icons-vue'
  import { useAccountsStore } from '../stores/accounts'
  import AccountItem from './AccountItem.vue'

  const store = useAccountsStore()

  // Список учетных записей
  const accounts = computed(() => store.accounts)

  // Добавление новой записи
  const handleAdd = () => {
    store.addAccount()
  }

  // Удаление записи
  const handleRemove = (id: string) => {
    store.removeAccount(id)
  }
</script>

<template>
  <main class="account-form" role="main">
    <header class="form-header">
      <h1 class="form-title">Управление учетными записями</h1>
      <el-button
        type="primary"
        :icon="Plus"
        circle
        size="large"
        aria-label="Добавить учетную запись"
        @click="handleAdd"
      />
    </header>

    <aside class="form-hint" aria-label="Подсказка">
      <span class="hint-icon" aria-hidden="true">💡</span>
      <p class="hint-text">
        В поле "Метка" можно вводить несколько значений, разделяя их символом <code>;</code>
      </p>
    </aside>

    <form class="accounts-form" aria-label="Форма учетных записей" @submit.prevent>
      <fieldset v-if="accounts.length > 0" class="accounts-fieldset">
        <legend class="visually-hidden">Список учетных записей</legend>

        <div class="accounts-header" role="row" aria-hidden="true">
          <span class="header-field">Метка</span>
          <span class="header-field">Тип записи</span>
          <span class="header-field">Логин</span>
          <span class="header-field">Пароль</span>
        </div>

        <ul class="accounts-list" role="list" aria-label="Учетные записи">
          <TransitionGroup name="list">
            <li v-for="account in accounts" :key="account.id" role="listitem">
              <AccountItem :account="account" @remove="handleRemove" />
            </li>
          </TransitionGroup>
        </ul>
      </fieldset>

      <section v-else class="empty-state" aria-label="Пустой список">
        <p>Нет учетных записей</p>
        <p class="empty-hint">Нажмите кнопку "+" чтобы добавить первую запись</p>
      </section>
    </form>
  </main>
</template>

<style scoped>
  .account-form {
    max-width: 1200px;
    margin: 0 auto;
    padding: 24px;
  }

  .form-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .form-title {
    margin: 0;
    font-size: 24px;
    font-weight: 600;
    color: #303133;
  }

  .form-hint {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 16px;
    background: #ecf5ff;
    border-radius: 8px;
    margin-bottom: 24px;
    color: #409eff;
  }

  .hint-icon {
    font-size: 16px;
  }

  .hint-text {
    font-size: 14px;
  }

  .hint-text code {
    background: rgba(64, 158, 255, 0.1);
    padding: 2px 6px;
    border-radius: 4px;
    font-family: monospace;
  }

  .accounts-form {
    width: 100%;
  }

  .accounts-fieldset {
    border: none;
    margin: 0;
    padding: 0;
  }

  .accounts-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 16px;
    margin-bottom: 8px;
    font-size: 13px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .header-field {
    flex: 1;
    min-width: 0;
  }

  .header-field:first-child {
    flex: 1.5;
  }

  .header-actions {
    width: 40px;
    flex-shrink: 0;
  }

  .accounts-list {
    min-height: 100px;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 48px 24px;
    background: #f5f7fa;
    border-radius: 8px;
    color: #909399;
  }

  .empty-state p {
    margin: 0;
    font-size: 16px;
  }

  .empty-hint {
    margin-top: 8px !important;
    font-size: 14px !important;
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

  /* Анимации списка */
  .list-enter-active,
  .list-leave-active {
    transition: all 0.3s ease;
  }

  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateX(-30px);
  }

  .list-move {
    transition: transform 0.3s ease;
  }
</style>
