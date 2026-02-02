# vue-accounts-form

Небольшое демонстрационное приложение на Vue + TypeScript + Vite для работы с формой ввода аккаунтов и локальным хранилищем состояний.

## Краткое описание

Приложение содержит простую форму для добавления аккаунтов и список добавленных элементов. Реализовано в виде компонентов Vue с использованием TypeScript; локальное состояние вынесено в `src/stores/accounts.ts`.

## Технологии

- Vue 3
- Vite
- TypeScript

## Быстрый старт

1. Установите зависимости:

```bash
npm install
```

2. Запустить в режиме разработки:

```bash
npm run dev
```

3. Собрать для продакшна:

```bash
npm run build
```

4. Просмотреть собранную версию локально:

```bash
npm run preview
```

## Структура проекта (ключевые файлы)

- [index.html](index.html) — HTML-шаблон
- [vite.config.ts](vite.config.ts) — конфигурация Vite
- [src/main.ts](src/main.ts) — точка входа приложения
- [src/App.vue](src/App.vue) — корневой компонент
- [src/components/AccountForm.vue](src/components/AccountForm.vue) — форма добавления/редактирования аккаунта
- [src/components/AccountItem.vue](src/components/AccountItem.vue) — отображение одного аккаунта в списке
- [src/stores/accounts.ts](src/stores/accounts.ts) — простое хранилище состояний для аккаунтов
- [src/types/account.ts](src/types/account.ts) — типы/интерфейсы для аккаунта