# eslint-plugin-lodash-to-native
Правило для ES Lint

Устанавливается через 

`npm install -S https://github.com/GumerShag/eslint-plugin-lodash-to-native.git` 

и подключается в `.eslintrc.js` так:
```js
"plugins": [
    "lodash-to-native"
],
"rules": {
    "lodash-to-native/map": "warn"
}
```

1. `_.map([1, 2, 3], fn)` заменяется на `[1, 2, 3].map(fn)`
2. `_.map({}, fn)` не подсвечивается и не предлагает заменить


