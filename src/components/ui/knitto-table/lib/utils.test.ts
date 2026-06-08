import { describe, expect, it } from 'vitest';
import { calculateElementOverflow, calculateFixedCardPosition, findChildRecursive, getObjKeyByValue, getScrollbarWidth } from './utils';

describe('getObjKeyByValue', () => {
  it('mengembalikan key yang sesuai dengan value', () => {
    const obj = { a: 1, b: 2, c: 'hello' };
    expect(getObjKeyByValue(obj, 1)).toBe('a');
    expect(getObjKeyByValue(obj, 2)).toBe('b');
    expect(getObjKeyByValue(obj, 'hello')).toBe('c');
  });

  it('mengembalikan undefined jika value tidak ditemukan', () => {
    const obj = { a: 1, b: 2 };
    expect(getObjKeyByValue(obj, 3)).toBeUndefined();
    expect(getObjKeyByValue(obj, 'x')).toBeUndefined();
  });

  it('mengembalikan key pertama jika ada value duplikat', () => {
    const obj = { first: 'x', second: 'x' };
    expect(getObjKeyByValue(obj, 'x')).toBe('first');
  });
});

describe('findChildRecursive', () => {
  it('mengembalikan direct child jika ditemukan', () => {
    const parent = {
      key: 'parent',
      caption: 'Parent',
      children: [
        { key: 'child1', caption: 'Child 1' },
        { key: 'child2', caption: 'Child 2' },
      ],
    };
    const result = findChildRecursive(parent, 'child2');
    expect(result).toEqual({ key: 'child2', caption: 'Child 2' });
  });

  it('mengembalikan undefined jika target tidak ada di direct children', () => {
    const parent = {
      key: 'parent',
      caption: 'Parent',
      children: [{ key: 'child1', caption: 'Child 1' }],
    };
    expect(findChildRecursive(parent, 'child2')).toBeUndefined();
  });

  it('mencari nested child secara rekursif', () => {
    const parent = {
      key: 'root',
      caption: 'Root',
      children: [
        {
          key: 'level1',
          caption: 'Level 1',
          children: [
            {
              key: 'level2',
              caption: 'Level 2',
              children: [{ key: 'deep', caption: 'Deep Child' }],
            },
          ],
        },
      ],
    };
    const result = findChildRecursive(parent, 'deep');
    expect(result).toEqual({ key: 'deep', caption: 'Deep Child' });
  });

  it('mengembalikan undefined jika parent tidak punya children', () => {
    const parent = { key: 'parent', caption: 'Parent' };
    expect(findChildRecursive(parent, 'any')).toBeUndefined();
  });

  it('mengembalikan undefined jika children kosong', () => {
    const parent = { key: 'parent', caption: 'Parent', children: [] };
    expect(findChildRecursive(parent, 'any')).toBeUndefined();
  });
});

describe('calculateFixedCardPosition', () => {
  const stubViewport = (width: number, height: number) => {
    Object.defineProperty(window, 'innerWidth', { value: width, writable: true, configurable: true });
    Object.defineProperty(window, 'innerHeight', { value: height, writable: true, configurable: true });
  };

  it('menghitung posisi default ketika cukup ruang', () => {
    stubViewport(1920, 1080);
    const rect = new DOMRect(500, 100, 50, 30);
    const result = calculateFixedCardPosition(rect);

    expect(result.calculatedLeft).toBe(350); // rect.left - 150
    expect(result.calculatedTop).toBe(130); // rect.bottom
  });

  it('membatasi calculatedLeft minimal 10 ketika overflow kiri', () => {
    stubViewport(1920, 1080);
    const rect = new DOMRect(50, 100, 50, 30);
    const result = calculateFixedCardPosition(rect);

    expect(result.calculatedLeft).toBe(10);
  });

  it('membatasi calculatedLeft ketika overflow kanan', () => {
    stubViewport(400, 1080);
    const rect = new DOMRect(300, 100, 50, 30);
    const result = calculateFixedCardPosition(rect);

    expect(result.calculatedLeft).toBe(180); // viewportWidth - 220
  });

  it('membatasi calculatedTop ketika overflow bawah', () => {
    stubViewport(1920, 400);
    const rect = new DOMRect(500, 350, 50, 30);
    const result = calculateFixedCardPosition(rect);

    expect(result.calculatedTop).toBe(120); // viewportHeight - cardHeight (280)
  });

  it('menggunakan cardHeight custom', () => {
    stubViewport(1920, 500);
    const rect = new DOMRect(500, 300, 50, 30);
    const result = calculateFixedCardPosition(rect, 150);

    expect(result.calculatedTop).toBe(330); // rect.bottom
  });
});

describe('getScrollbarWidth', () => {
  it('mengembalikan 0 ketika ref.current null', () => {
    const ref = { current: null };
    expect(getScrollbarWidth(ref as React.RefObject<HTMLDivElement | null>)).toBe(0);
  });

  it('menghitung lebar scrollbar dari offsetWidth - clientWidth', () => {
    const mockElement = {
      offsetWidth: 200,
      clientWidth: 184,
    } as HTMLDivElement;
    const ref = { current: mockElement };

    expect(getScrollbarWidth(ref as React.RefObject<HTMLDivElement | null>)).toBe(16);
  });
});

describe('calculateElementOverflow', () => {
  const stubViewport = (width: number, height: number) => {
    Object.defineProperty(window, 'innerWidth', { value: width, writable: true, configurable: true });
    Object.defineProperty(window, 'innerHeight', { value: height, writable: true, configurable: true });
  };

  it('menghitung overflow dengan benar', () => {
    stubViewport(1000, 800);
    const rect = new DOMRect(100, 50, 200, 100);
    const result = calculateElementOverflow(rect, 300, 400);

    expect(result.right).toBe(600); // 1000 - (100 + 300)
    expect(result.bottom).toBe(350); // 800 - (50 + 400)
    expect(result.left).toBe(100);
    expect(result.top).toBe(50);
  });

  it('menghasilkan nilai negatif ketika overflow', () => {
    stubViewport(1000, 800);
    const rect = new DOMRect(900, 100, 50, 50);
    const result = calculateElementOverflow(rect, 200, 100);

    expect(result.right).toBeLessThan(0); // overflow kanan
    expect(result.left).toBe(900);
  });
});
