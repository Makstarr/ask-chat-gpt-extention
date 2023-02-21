// prettier.config.js or .prettierrc.js
module.exports = {
  trailingComma: 'es5',
  printWidth: 80,

  /* === Tabs === */
  useTabs: false,
  tabWidth: 2,

  /* === Quotes & Semicolons */
  semi: true,
  singleQuote: true,

  importOrder: [
    '^react(.*)',
    'antd/(.*)',
    '<THIRD_PARTY_MODULES>',
    '@/(.*)',
    '^src/assets(.*)',
    '^src/(?!components)',
    '^src/components(.*)',
    '^[./]',
  ],
  importOrderSeparation: true,
};
