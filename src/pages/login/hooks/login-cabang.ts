import { ISelect } from '@knittotextile/react-ui';
import { z } from 'zod';

export const formLoginCabangSchema = z.object({
  username: z.string().min(1, { message: 'Username wajib diisi' }),
  password: z.string().min(1, { message: 'Password wajib diisi' }),
  branch: z.string().min(1, { message: 'Cabang wajib diisi' }),
});

export type FormLoginCabangSchema = z.infer<typeof formLoginCabangSchema>;

export const branchOptions: ISelect['options'] = [
  { label: 'HOLIS', value: 'HOLIS' },
  { label: 'KEBON JUKUT', value: 'KEBON JUKUT' },
  { label: 'SUDIRMAN', value: 'SUDIRMAN' },
];
