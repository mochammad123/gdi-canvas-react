import { getResponseData } from '@/pages/example/templates/hooks/use-response-data-query';
import { describe, expect, it } from 'vitest';

describe('getResponseData', () => {
  it('seharusnya mengembalikan data sesuai perPage pada halaman pertama', () => {
    const result = getResponseData({ currentPage: 1, currentPerPage: 100 });

    expect(result.data).toHaveLength(100);
    expect(result.totalData).toBe(1000);
    expect(result.page).toBe(1);
    expect(result.perPage).toBe(100);
  });

  it('seharusnya mengembalikan header kolom yang diharapkan', () => {
    const result = getResponseData({ currentPage: 1, currentPerPage: 100 });
    const keys = result.header.map((item) => item.key);

    expect(keys).toEqual(['name', 'category', 'chemical', 'active', 'action']);
  });

  it('seharusnya menyimpan semua halaman di allData', () => {
    const result = getResponseData({ currentPage: 1, currentPerPage: 100 });

    expect(Object.keys(result.allData)).toHaveLength(10);
    expect(result.allData[1]).toHaveLength(100);
  });

  it('seharusnya memfilter data ketika id diberikan', () => {
    const allResult = getResponseData({ currentPage: 1, currentPerPage: 100 });
    const firstRowName = allResult.data[0]?.name;

    if (!firstRowName) {
      throw new Error('Data pertama tidak ditemukan');
    }

    const filteredResult = getResponseData({ currentPage: 1, currentPerPage: 100, id: firstRowName });

    expect(filteredResult.totalData).toBeLessThanOrEqual(1);
    expect(filteredResult.data.every((row) => row.name === firstRowName)).toBe(true);
  });
});
