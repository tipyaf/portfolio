import nextConfig from 'eslint-config-next';
import prettierPlugin from 'eslint-plugin-prettier/recommended';

const config = [
  ...nextConfig,
  prettierPlugin,
  {
    ignores: ['.next/', 'node_modules/'],
  },
];

export default config;
