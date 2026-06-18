import { describe, expect, it } from 'vitest';
import { formLoginCabangSchema } from './hooks/login-cabang';

describe('Form Login Cabang Schema', () => {
  it('seharusnya validasi input sukses', () => {
    expect(formLoginCabangSchema.parse({ username: 'admin', password: 'admin', branch: 'HOLIS' })).toEqual({
      username: 'admin',
      password: 'admin',
      branch: 'HOLIS',
    });
  });

  it('seharusnya validasi input gagal ketika username kosong', () => {
    expect(() => formLoginCabangSchema.parse({ username: '', password: 'admin', branch: 'HOLIS' })).toThrow('Username wajib diisi');
  });

  it('seharusnya validasi input gagal ketika password kosong', () => {
    expect(() => formLoginCabangSchema.parse({ username: 'admin', password: '', branch: 'HOLIS' })).toThrow('Password wajib diisi');
  });

  it('seharusnya validasi input gagal ketika cabang kosong', () => {
    expect(() => formLoginCabangSchema.parse({ username: 'admin', password: 'admin', branch: '' })).toThrow('Cabang wajib diisi');
  });
});
