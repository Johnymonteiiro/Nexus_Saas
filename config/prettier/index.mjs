
/** @typedef {import('prettier').Config}  PrettierConfig*/

/** @type { PrettierConfig } */

const config = {
   plugins: ['prettier-plugin-tailwindcss'],
   printWidth: 80, // ==> limite do tamanho do codigo
   tabWidth: 2, // ==> espaço do tab
   useTabs: false, // ==> não usar tabs
   semi: false, // ==> Não usar ; no final
   singleQuote: true, // ==> usar aspas duplas
   quoteProps: 'as-needed', // ==> botar aspas nos objetos quando precisar
   jsxSingleQuote: false, // ==> botar aspas duplas nos atributos do jsx Ex: <butto type="">
   trailingComma: 'es5', // ==> bota a vigula no final
   bracketSpacing: true,// ==> espacamento entre chaves e funcoes
   arrowParens: 'always', // ==> botar parenteses por volta dos parametros
   endOfLine:'auto', // ==> padronizar o final de linhas
   bracketSameLine: false, // ==> limite do tamanho do codigo
}


export default config;