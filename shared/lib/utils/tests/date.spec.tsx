import { calFormatDateToDot, calFormatDateToUS } from '@/shared/lib/utils/date';
import { describe, expect, it } from 'vitest';

describe('calFormatDateToDot 계산 함수 테스트', () => {
  it('날짜 문자열에서 날짜만 추출해 하이픈(-)을 점(.)으로 바꿔 반환.', () => {
    // Arrange
    const input = '2025-06-15 11:21:37';

    // Act
    const result = calFormatDateToDot(input);

    // Assert
    expect(result).toBe('2025.06.15');
  });

  it('잘못된 날짜일 경우 빈 문자열을 반환', () => {
    // Arrange
    const input = 'invalid-date';

    // Act
    const result = calFormatDateToDot(input);

    // Assert
    expect(result).toBe('');
  });
});

describe('calFormatDateToUS 계산 함수 테스트', () => {
  it('미국식 축약 날짜 형식으로 변환', () => {
    // Arrange
    const input = '2025-06-15 11:21:37';

    // Act
    const result = calFormatDateToUS(input);

    // Assert
    expect(result).toBe('Jun 15, 2025');
  });

  it('잘못된 날짜일 경우 빈 문자열을 반환', () => {
    // Arrange
    const input = 'invalid-date';

    // Act
    const result = calFormatDateToUS(input);

    // Assert
    expect(result).toBe('');
  });
});
