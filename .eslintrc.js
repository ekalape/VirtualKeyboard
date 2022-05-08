module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ["airbnb-base"],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    rules: {
        indent: ["error", 4],
        quotes: ["error", "double"],
        "prefer-destructuring": ["error", { object: false, array: false }],
        "no-use-before-define": [
            "error",
            { functions: false, classes: true, variables: true },
        ],
        camelcase: ["error", { properties: "never" }],
        "implicit-arrow-linebreak": ["error", "below"],
        "import/extensions": ["error", "always"],

    },
};
