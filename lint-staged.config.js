export default {
  '**/*.{js,ts,tsx}': () => 'eslint --fix',
  '**/*.ts?(x)': () => 'tsc -p tsconfig.json --noEmit --composite false',
}
