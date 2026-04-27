### запуск
```bash
npm install

npm run dev
```
приложение откроется на [localhost:3000](http://localhost:3000)

при коммите запускается [lint-staged](https://github.com/lint-staged/lint-staged) для очистки мусора, форматирования кода и показа ошибок типизации, если они есть. для хука коммита использовал [husky](https://github.com/typicode/husky)

### структура проекта
```
bbk-test/
├── app/
│   ├── components/
│   │   ├── breadcrumbs/          # компоненты навигации (breadcrumbs)
│   │   │   ├── breadcrumbs.vue   # контейнер для хлебных крошек
│   │   │   └── crumb.vue         # отдельная хлебная крошка
│   │   └── tree/                 # компоненты древовидной структуры
│   │       ├── bbk-tree.vue      # рекурсивное дерево
│   │       ├── bbk-tree-node.vue # отдельный узел дерева
│   │       └── bbk-details.vue   # панель деталей выбранного элемента
│   ├── pages/
│   │   └── index.vue             # главная страница
│   ├── layouts/
│   │   └── default.vue           # шаблон с header с поиском
│   ├── stores/
│   │   ├── bbk-store.ts          # pinia стор узлов
|   |   └── breadcrumbs.ts        # pinia стор хлебных крошек
│   ├── types/                    # папка с типами приложения
│   └── app.vue
│
├── server/                        # nitro бэкенд моков
│
├── api/                          # папка с api микросов
│   ├── bbk-service/
│   │   ├── client.ts             # composable http client для bbk сервиса
│   │   └── requests/
│   │       └── bbk-root-validator.ts # valibot схема валидации
│   └── request.ts                # инкапсуляция http клиента. полезно когда нужно будет настраивать заголовки и прочее
│
├── nuxt.config.ts
├── tailwind.config.ts
├── package.json
└── tsconfig.json
```

### принятые решения

- **valibot для валидации**
- **tailwind CSS вместо CSS modules**
- **условное включение @nuxt/eslint только в dev**
- **breadcrumbs с подсвечиванием**
- **инкапсуляция логики http клиента в composables**
- **TypeScript strict mode**
- **не указал то что и так подразумевается тестовым заданием, например никакой бизнес логики в компонентах**

### development tools

- **ESLint** - контроль качества кода (dev only)
- **Prettier** - автоматическое форматирование
- **Stylelint** - проверка CSS (на будущее)
- **Husky** - git hooks для качества коммитов
- **lint-staged** - проверка только измененных файлов