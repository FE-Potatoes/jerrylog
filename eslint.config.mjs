import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// https://techblog.woowahan.com/15903/
const eslintConfig = [
  // RushStack ESLint 설정
  ...compat.extends('@rushstack/eslint-config/profile/web-react'),

  // Next 설정
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  // 커스텀 rules 설정 (rules는 flat config에서는 별도 객체로 분리됨)
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    settings: {
      react: {
        version: '19.1.0',
      },
    },
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    rules: {
      plugins: {
        'jsx-a11y': jsxA11yPlugin,
        'no-relative-import-paths': noRelativeImportPaths,
      },
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
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
      // DOM에 정의되지 않은 속성을 사용했는지 체크 (emotion css 속성 등 예외 케이스가 있으므로 기본은 off)
      'react/no-unknown-property': 'off',
      // 정의한 props 중에 빠진게 있는지 체크 (NextPage 등 일부 추상화 컴포넌트에서 복잡해지므로 기본은 off)
      'react/prop-types': 'off',

      // 같은 폴더인 경우를 제외하고 import 경로는 항상 절대 경로를 사용
      'no-relative-import-paths/no-relative-import-paths': [
        'warn',
        { allowSameFolder: true, rootDir: 'src', prefix: '@' },
      ],

      // 구조분해 할당 강제 규칙
      'prefer-destructuring': [
        'error',
        {
          VariableDeclarator: {
            array: false,
            object: true,
          },
          AssignmentExpression: {
            array: false,
            object: false,
          },
        },
      ],

      // @rushstack/eslint-config를 설치했다면 별도 설치 필요없음
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
    },
  },
];

export default eslintConfig;
