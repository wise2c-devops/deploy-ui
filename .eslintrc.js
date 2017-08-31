module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module'
  },
  extends: 'eslint:recommended',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    semi: [2, "never"],
    indent: ["error", 2, {"SwitchCase": 1}],
    'no-console': ["warn", {allow: ["warn", "error"]}],
    'no-undef': 0,
    'no-irregular-whitespace': "error",
    'no-whitespace-before-property': "error",
    'no-trailing-spaces': "error",
    'eqeqeq': "error",
    'no-multi-spaces': "error",
    'semi-spacing': ['error', {"before": false, "after": true}],
    'no-extra-boolean-cast': 0,
    'no-unused-vars': 'warn'
  }
}
