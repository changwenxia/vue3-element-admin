module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
		"./.eslintrc-auto-import.json",
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:vue/vue3-essential"
    ],
    parser: 'vue-eslint-parser',
    "parserOptions": {
        "ecmaVersion": "latest",
        "parser": "@typescript-eslint/parser",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "vue"
    ],
    "rules": {
    }
}
