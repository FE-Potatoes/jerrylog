/**
 * 날짜 문자열에서 날짜만 추출해 하이픈(-)을 점(.)으로 바꿔 반환.
 * 예: "2025-06-15 11:21:37" → "2025.06.15"
 */
export const calFormatDateToDot = (date: string) => {
  const parsed = new Date(date);
  if (isNaN(parsed.getTime())) return '';

  const [yymmdd] = date.split(' ');
  const dotDate = yymmdd.replace(/-/g, '.');
  return dotDate;
};

/**
 * 주어진 날짜 문자열을 미국식 축약 날짜 형식("MM DD, YYYY")으로 변환.
 * 예: "2025-06-15 11:21:37" → "Jun 15, 2025"
 */
export const calFormatDateToUS = (date: string) => {
  const parsed = new Date(date);
  if (isNaN(parsed.getTime())) return '';

  const enDate = parsed.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });
  return enDate;
};
