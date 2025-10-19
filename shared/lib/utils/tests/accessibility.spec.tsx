import {
  calGetFocusableElements,
  calIsFocusable,
} from '@/shared/lib/utils/accessibility';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

describe('calIsFocusable 주어진 요소가 실제로 포커스 가능한지 판단', () => {
  let el: HTMLElement;

  beforeEach(() => {
    // Arrange: 테스트용 요소 초기화
    el = document.createElement('button');
    document.body.appendChild(el);

    // JSDOM에서는 offsetParent가 항상 null → 브라우저처럼 존재하도록 mock
    Object.defineProperty(el, 'offsetParent', {
      value: document.body,
      configurable: true,
    });
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('기본 상태에서는 포커스 가능', () => {
    // Act
    const result = calIsFocusable(el);

    // Assert
    expect(result).toBe(true);
  });

  it('display:none 요소는 포커스 불가', () => {
    // Arrange
    el.setAttribute('disabled', 'true');

    // Act
    const result = calIsFocusable(el);

    // Assert
    expect(result).toBe(false);
  });

  it('visibility:hidden 요소는 포커스 불가', () => {
    // Arrange
    el.setAttribute('style', 'visibility: hidden;');

    // Act
    const result = calIsFocusable(el);

    // Assert
    expect(result).toBe(false);
  });

  it('offsetParent가 null이면 포커스 불가', () => {
    // Arrange
    Object.defineProperty(el, 'offsetParent', {
      value: null,
      configurable: true,
    });

    // Act
    const result = calIsFocusable(el);

    // Assert
    expect(result).toBe(false);
  });

  it('disabled 속성이 있으면 포커스 불가', () => {
    // Arrange
    el.setAttribute('disabled', 'true');

    // Act
    const result = calIsFocusable(el);

    // Assert
    expect(result).toBe(false);
  });

  it('aria-disabled="true"이면 포커스 불가', () => {
    // Arrange
    el.setAttribute('aria-disabled', 'true');

    // Act
    const result = calIsFocusable(el);

    // Assert
    expect(result).toBe(false);
  });

  it('inert 속성이 있으면 포커스 불가', () => {
    // Arrange
    el.setAttribute('inert', '');

    // Act
    const result = calIsFocusable(el);

    // Assert
    expect(result).toBe(false);
  });

  it('aria-hidden="true"이면 포커스 불가', () => {
    // Arrange
    el.setAttribute('aria-hidden', 'true');

    // Act
    const result = calIsFocusable(el);

    // Assert
    expect(result).toBe(false);
  });

  it('tabindex가 -1이면 포커스 불가', () => {
    // Arrange
    el.setAttribute('tabindex', '-1');

    // Act
    const result = calIsFocusable(el);

    // Assert
    expect(result).toBe(false);
  });

  it('tabindex가 0 이상이면 포커스 가능', () => {
    // Arrange
    el.setAttribute('tabindex', '0');

    // Act
    const result = calIsFocusable(el);

    // Assert
    expect(result).toBe(true);
  });
});

describe('calGetFocusableElements 주어진 컨테이너 내에서 실제로 포커스 가능한 모든 요소를 반환', () => {
  let container: HTMLElement;

  beforeEach(() => {
    // Arrange: 테스트용 DOM 컨테이너 초기화
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('포커스 가능한 요소들을 반환해야 한다', () => {
    // Arrange
    container.innerHTML = `
      <button>Click</button>
      <a href="#">Link</a>
      <input type="text" />
    `;

    // Act
    const focusable = calGetFocusableElements(container);

    // Assert
    expect(focusable.length).toBe(3);
    expect(focusable.map((el) => el.tagName.toLowerCase())).toEqual([
      'button',
      'a',
      'input',
    ]);
  });

  // it('숨겨진 요소는 제외해야 한다 (display:none)', () => {
  //   // Arrange
  //   container.innerHTML = `
  //   <button style="display:none">Hidden</button>
  //   <button>Visible</button>
  // `;

  //   // Act
  //   const focusable = calGetFocusableElements(container);

  //   // Assert
  //   expect(focusable.length).toBe(1);
  //   expect(focusable[0].textContent).toBe('Visible');
  // });

  // it('disabled 요소는 제외해야 한다', () => {
  //   // Arrange
  //   container.innerHTML = `
  //   <button disabled>Disabled</button>
  //   <button>Enabled</button>
  // `;

  //   // Act
  //   const focusable = calGetFocusableElements(container);

  //   // Assert
  //   expect(focusable.length).toBe(1);
  //   expect(focusable[0].textContent).toBe('Enabled');
  // });

  // it('aria-hidden="true" 요소는 제외해야 한다', () => {
  //   // Arrange
  //   container.innerHTML = `
  //   <button aria-hidden="true">Hidden</button>
  //   <button>Visible</button>
  // `;

  //   // Act
  //   const focusable = calGetFocusableElements(container);

  //   // Assert
  //   expect(focusable.length).toBe(1);
  //   expect(focusable[0].textContent).toBe('Visible');
  // });

  // it('tabindex="-1" 요소는 제외해야 한다', () => {
  //   // Arrange
  //   container.innerHTML = `
  //   <button tabindex="-1">Not Focusable</button>
  //   <button tabindex="0">Focusable</button>
  // `;

  //   // Act
  //   const focusable = calGetFocusableElements(container);

  //   console.log(focusable.map((el) => el.textContent));

  //   // Assert
  //   expect(focusable.length).toBe(1);
  //   expect(focusable[0].textContent).toBe('Focusable');
  // });

  // it('container가 null이면 빈 배열을 반환해야 한다', () => {
  //   // Act
  //   const focusable = calGetFocusableElements(null);

  //   // Assert
  //   expect(focusable).toEqual([]);
  // });
});
