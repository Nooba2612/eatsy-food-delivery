const globals = require("globals");
const pluginJs = require("@eslint/js");

module.exports = [
    pluginJs.configs.recommended,
    {
        files: ["**/*.js"],
        ignores: ["**/*.test.js"],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
            ecmaVersion: "latest",
            sourceType: "module",
        },
        rules: {
            "no-unused-vars": "warn",
            "no-undef": "error",
        },
    },
];
