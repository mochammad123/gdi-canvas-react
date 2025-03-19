import { generateTableFilterOptions, ITableVirtual } from '@/components/ui/table-virtual';

export interface ITableDataSource {
  nama_produk: string;
  kategori?: string;
  sub_1?: string;
  sub_2?: string;
  harga_1?: number;
  harga_2?: number;
  stok?: number;
  terjual?: number;
  rating?: string;
  supplier?: string;
  lokasi_gudang?: string;
  tanggal_update?: string;
  status?: string;
  berat?: number;
  dimensi?: string;
  warna?: string;
  bahan?: string;
  diskon?: number;
  harga_setelah_diskon?: number;
  minimal_pemesanan?: number;
}

const randomString = (length: number): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
};

const randomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const dataSource: ITableDataSource[] = Array(10000)
  .fill(true)
  .map((_, idx) => ({
    nama_produk:
      idx >= 0 && idx <= 5
        ? 'Laptop Lenovo Thinkpad ' + idx
        : idx > 5 && idx <= 10
          ? 'Laptop HP'
          : idx > 10 && idx <= 40
            ? `Laptop Macbook Pro M3`
            : `${randomString(5)} ${randomString(20)} ${randomString(5)}`,
    kategori: `Kategori ${randomString(idx > 5 ? 20 : 4)} ${idx}`,
    harga_1: randomNumber(2, 100000000),
    sub_2: randomString(10),
    stok: randomNumber(1, 1000),
    terjual: randomNumber(1, 200),
    rating: Array(randomNumber(1, 5))
      .fill(true)
      .map(() => '⭐')
      .join(''),
    supplier: randomString(4) + ' ' + randomString(7),
    lokasi_gudang: `Lokasi Gudang ${idx}`,
    tanggal_update: new Date().toLocaleDateString(),
    status: `Status ${idx}`,
    berat: randomNumber(1, 20),
    dimensi: `Dimensi ${idx}`,
    warna: `Warna ${idx}`,
    bahan: `Bahan ${idx}`,
    diskon: Math.random() * 10,
    harga_setelah_diskon: Math.random() * 1000000,
    minimal_pemesanan: Math.random() * 10,
  }));

export const getHeaders = (dataSource: ITableDataSource[]): ITableVirtual<ITableDataSource>['headers'] => {
  const getFilterOptions = (key: keyof ITableDataSource) => generateTableFilterOptions(dataSource, key);

  return [
    {
      key: 'nama_produk',
      caption: 'Nama Produk',
      fixedWidth: 340,
      freezed: false,
      filterOptions: getFilterOptions('nama_produk'),
    },
    {
      key: 'kategori',
      caption: 'Kategori',
      freezed: true,
      children: [
        { caption: 'Sub 1', key: 'sub_1', filterOptions: getFilterOptions('sub_1') },
        { caption: 'Sub 2', key: 'sub_2', filterOptions: getFilterOptions('sub_2') },
      ],
    },
    {
      key: 'harga_1',
      caption: 'Harga (Rp)',
      freezed: false,
      children: [
        { caption: 'Harga 1', key: 'harga_1' },
        { caption: 'Harga 2', key: 'harga_2' },
      ],
    },
    { key: 'stok', caption: 'Stok (pcs)' },
    { key: 'terjual', caption: 'Terjual (pcs)' },
    { key: 'rating', caption: 'Rating', freezed: true, filterOptions: getFilterOptions('rating') },
    { key: 'supplier', caption: 'Supplier' },
    { key: 'lokasi_gudang', caption: 'Lokasi Gudang' },
    { key: 'tanggal_update', caption: 'Tanggal Update' },
    { key: 'status', caption: 'Status' },
    { key: 'berat', caption: 'Berat (kg)' },
    { key: 'dimensi', caption: 'Dimensi (cm)' },
    { key: 'warna', caption: 'Warna' },
    { key: 'bahan', caption: 'Bahan' },
    { key: 'diskon', caption: 'Diskon (%)' },
    { key: 'harga_setelah_diskon', caption: 'Harga Setelah Diskon (Rp)' },
    { key: 'minimal_pemesanan', caption: 'Minimal Pemesanan' },
  ];
};
