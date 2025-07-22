import { FlatCompat } from '@eslint/eslintrc';
import eslintPluginJsxA11y from 'eslint-plugin-jsx-a11y';
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths';
import reactRefresh from 'eslint-plugin-react-refresh';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/**
 * @type {import('eslint').Linter.FlatConfig[]}
 */
const config = [
  // Next 설정
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  {
    plugins: {
      'no-relative-import-paths': noRelativeImportPaths,
      'react-refresh': reactRefresh,
      'jsx-a11y': eslintPluginJsxA11y,
    },

    // eslint 적용 안함
    ignores: ['node_modules/', '.next/', 'dist/', 'build/', 'public/'],

    // 해당 파일만 검사
    files: ['**/*.{ts,tsx,js,jsx}'],
    settings: {
      react: {
        version: '19.1.0',
      },
    },

    rules: {
      // 정의한 props 중에 빠진게 있는지 체크 (NextPage 등 일부 추상화 컴포넌트에서 복잡해지므로 기본은 off)
      'react/prop-types': 'off',
      // 컴포넌트 파일에서 React 컴포넌트만 (또는 allowConstantExport: true 시 상수 포함) export하도록 강제함
      // 코드 변경 시 UI 상태 유지를 돕고 불필요한 전체 새로고침을 방지
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // 사용하지 않는 변수 Error
      '@typescript-eslint/no-unused-vars': 'error',
      // any 타입 경고
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/naming-convention': [
        'warn',
        // camelCase 변수, PascalCase 변수, UPPER_CASE 변수 허용
        {
          selector: 'variable',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        },
        // camelCase 함수, PascalCase 함수 허용
        {
          selector: 'function',
          format: ['camelCase', 'PascalCase'],
        },
        // PascalCase 클래스, interfaces, type aliases, enums 허용
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
        // interface 앞에 I 사용 불가
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: {
            regex: '^I[A-Z]',
            match: false,
          },
        },
        // typeAlias 앞에 T 사용 불가
        {
          selector: 'typeAlias',
          format: ['PascalCase'],
          custom: {
            regex: '^T[A-Z]',
            match: false,
          },
        },
        // typeParameter 앞에 T 사용 불가
        {
          selector: 'typeParameter',
          format: ['PascalCase'],
          custom: {
            regex: '^T[A-Z]',
            match: false,
          },
        },
      ],
      // 상대 경로 import 금지하고, 절대 경로 import 강제 (같은 폴더는 허용)
      'no-relative-import-paths/no-relative-import-paths': [
        'warn',
        { allowSameFolder: true, rootDir: '', prefix: '@' },
      ],
      // 구조분해 할당 강제 규칙
      'prefer-destructuring': [
        'error',
        {
          VariableDeclarator: {
            array: false, // 배열은 강제하지 않음
            object: true, // 객체는 구조분해할당 강제
          },
          // 할당 let과 같은 경우는 강제하지 않음
          AssignmentExpression: {
            array: false,
            object: false,
          },
        },
      ],

      // ! 접근성 관련
      // <img> 엘리먼트에 유의미한 대체 텍스트가 있는지 체크
      'jsx-a11y/alt-text': ['warn', { elements: ['img'] }],
      // 유효한 aria-* 속성만 사용
      'jsx-a11y/aria-props': 'warn',
      // 유효한 aria-* 상태/값만 사용
      'jsx-a11y/aria-proptypes': 'warn',
      // DOM에서 지원되는 role, ARIA만 사용
      'jsx-a11y/aria-unsupported-elements': 'warn',
      // 필수 ARIA 속성이 빠져있는지 체크
      'jsx-a11y/role-has-required-aria-props': 'warn',
      // ARIA 속성은 지원되는 role에서만 사용
      'jsx-a11y/role-supports-aria-props': 'warn',
    },
  },
];

export default config;
