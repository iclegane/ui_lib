import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import typescriptEslintParser from '@typescript-eslint/parser';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';

export default [
    {
        ignores: ['**/__tests__/**', '**/__mocks__/**'],
    },
    {
        files: ['**/*.ts', '**/*.tsx'],
        plugins: {
            '@typescript-eslint': typescriptEslintPlugin,
            'react-refresh': reactRefreshPlugin,
            prettier: prettierPlugin,
            import: importPlugin,
        },
        languageOptions: {
            parser: typescriptEslintParser,
            ecmaVersion: 2020,
            sourceType: 'module',
        },
        rules: {
            'no-console': 'off',
            'prettier/prettier': 'error',
            'import/order': [
                'warn',
                {
                    'newlines-between': 'always',
                    groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
                    alphabetize: { order: 'asc', caseInsensitive: true },
                    pathGroups: [
                        { pattern: '~**/**', group: 'parent' },
                        { pattern: '../**', group: 'sibling' },
                    ],
                },
            ],
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        },
    },
    // Disable rules that conflict with Prettier
    prettierConfig,
];
