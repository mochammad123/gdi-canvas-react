import dayjs from 'dayjs';

export const isValidDateFormat = (format: string): boolean => {
  const hasMonth = /M{1,2}/.test(format);
  const hasYear = /Y{2,4}/.test(format);
  return hasMonth && hasYear;
};

export const parseFormat = (dateStr: string, format: string): string | null => {
  if (!isValidDateFormat(format)) {
    console.warn('Invalid date format. Format must include month (M/MM) and year (YY/YYYY)');
    return null;
  }

  const parsed = dayjs(dateStr, format);
  if (!parsed.isValid()) {
    console.warn('Invalid date string for the given format');
    return null;
  }

  return parsed.format('YYYY-MM-DD');
};

export const formatWithLocale = (date: dayjs.Dayjs, format: string, locale: LocaleSupport): string => {
  try {
    return date.locale(locale).format(format);
  } catch (error) {
    return date.locale('en').format(format);
  }
};
