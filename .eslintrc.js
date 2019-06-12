module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/airbnb'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    semi: [2, 'never'],
    indent: ['error', 2, { SwitchCase: 1 }],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-undef': 0,
    'no-irregular-whitespace': 'error',
    'no-whitespace-before-property': 'error',
    'no-trailing-spaces': 'error',
    eqeqeq: 'error',
    'no-multi-spaces': 'error',
    'semi-spacing': ['error', { before: false, after: true }],
    'no-extra-boolean-cast': 0,
    'no-unused-vars': 'warn',
    'no-param-reassign': 'off',
    'max-len': 'off', // line max length 100
    'import/extensions': 'off', // file extension
    camelcase: 'off', // parameter can not camel case but our project has so many situations
    'import/no-unresolved': 'off', // handle webpack alias , unable to resolve the path
    'import/first': 'off',
    'vue/no-side-effects-in-computed-properties': 'off',
    'prefer-destructuring': 'off',
    'no-return-assign': 'off',
    'array-callback-return': 'off',
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'comma-dangle': ['error', 'only-multiline'],
    'consistent-return': 'off',
    'import/first': 'off',
    'prefer-destructuring': 'off',
    'no-return-assign': 'off',
    'array-callback-return': 'off',
    'one-var': 'off',
    'no-shadow': 'off',
    'no-script-url': 'off',
    'no-restricted-syntax': 'off',
    'no-bitwise': 'off',
    'no-continue': 'off',
    'no-underscore-dangle': 'off',
    'vue/no-side-effects-in-computed-properties': 'off',
    'new-cap': 'off',
    'import/prefer-default-export': 'off',
    'no-new': 'off',
    'prefer-template': 'off',
    'global-require': 'off',
    'import/no-cycle': 0,
    'import/order': 0,
    'object-curly-newline':0,
    'no-tabs':0
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        indent: 'off',
        'vue/script-indent': ['error', 2, { baseIndent: 1 }]
      }
    }
  ],
  parserOptions: {
    parser: 'babel-eslint'
  }
}
