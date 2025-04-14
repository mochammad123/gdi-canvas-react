# Table Virtual

Komponen tabel yang di buat dengan menggunakan library _**react-window**_ untuk load data yang banyak karena mendukung teknik windowing, komponen yang digunakan adalah _**VariableSizedGrid**_.

Namun tetap ada kustomisasi untuk sticky header, footer, dan kolom, serta resize kolom melalui header.

Tech Stack: _**ReactJS(Typescript)**_, _**TailwindCSS**_

## Atribut

atribut komponen utama Table Virtual
| Nama | Tipe Data | Usage | Fungsi |
| ------ | ------ | ------ | ------ |
| dataSource | `Array<TData>` | `<TableVirtual ...dataSource />` | Sebagai data tabel |
| headers | `IDataHeader<TData>` | ... | Sebagai data header tabel |
| columnWidth | `number` | ... | Mengatur lebar sel |
| rowHeight | `number` | ... | Mengatur tinggi sel |
| stickyHeaderHeight | `number` | ... | Mengatur tinggi sticky header |
| stickyFooterHeight | `number` | ... | Mengatur tinggi sticky footer |
| isLoading | `boolean` | ... | Menampilkan tabel loading |
| useAutoWidth | `boolean` | ... | Ketika jumlah kolom tidak sampai melebihi viewport, apakah ingin lebar cell nya otomatis|
| useFooter | `boolean` | ... | Menampilkan sticky footer |
| useServerSort | `boolean` | ... | Untuk sorting secara server side. fungsi sort di client tidak akan berfungsi. |
| useServerFilter | `boolean` | ... | Untuk filter secara server side. Fungsi filter di client tidak akan berfungsi. |
| useServerAdvanceFilter | boolean | ... | Untuk filter advance secara server side. Fungsi di client tidak akan berfungsi. |
| onChangeFilter | `(data: Record<string, string[]>) => void` | ... | Mengembalikan `{key: [value1, value2, value3, ...]}` |
| onChangeAdvanceFilter | `(data: Record<string, { filterName: TAdvanceFilterName; value: string; }>) => void` | ... | Mengembalikan `{key: { filterName: '', value: '' }}` |
| onScrollTouchBottom | `() => void` | ... | Callback saat scroll mencapai bawah |
| onClickRow | `(data: Record<string, string/number>, rowIndex: number) => void` | ... | Mengembalikan data 1 baris dan indeksnya |
| classNameCell | `(data: Record<string, string/number>, rowIndex: number, columnIndex: number, isFreezed: boolean) => string` | `<TableVirtual classNameCell={(data, rowIdx, colIdx, isFreezed) => ""} />` | Memberikan styling pada sel berdasarkan data, rowIndex, columnIndex, atau kondisi lainnya |
| renderRightClickRow | `(data: Record<string, string / number> / null, value: string / number, callbackFn?: () => void) => JSX.Element` | `<TableVirtual renderRightClickRow={(data, cellValue, callbackFn) => <div>{...}</div>} />`| Mengembalikan elemen JSX saat klik kanan pada sel |
| useColumnHiddenIndicator |`boolean`| `<TableVirtual useColumnHiddenIndicator={true} />` | Untuk memberi opsi indikator muncul atau tidak, pada icon menu bar di setiap kolom header, indikator tersebut untuk memberi info jika ada kolom yang di hide. |
| useServerSearch |`boolean`| `<TableVirtual useServerSearch={true | false} />` | Untuk search secara server side. Fungsi search di client tidak akan berfungsi. |
| onChangeSearch |`(data: Record<string, string>) => void`| `<TableVirtual onChangeSearch={(prop) => {}} />` | Mengembalikan`{key: value}` |
| headerModel | 'double-row' or 'single-row' | `<TableVirtual headerModel="single-row" />` | Memberikan oopsi untuk versi header yang berbeda yaitu dengan 1 baris atau dua baris. Untuk burger icon untuk yang double-row by default akan true sedangkan yang single-row by default akan false. |

## Table Header

Nama property di komponen: _**headers**_
Tipe data: `IDataHeader<TDataSource>`

Detail atribut header dari `IDataHeader<TDataSource>`

```sh
IDataHeader<TDataSource> {
  key: keyof TDataSource;
  caption: string;
  className?: string;
  useHeaderAction?: boolean;
  useFilter?: boolean;
  useSort?: boolean;
  useSearch?: boolean;
  useSingleFilter?: boolean;
  useAdvanceFilter?: boolean;
  freezed?: boolean;
  filterOptions?: string[];
  render?: (value?: number | string, rowIndex?: number, columnIndex?: number) => ReactNode | string;
  renderSummary?: (
    value?: number | string,
    rowIndex?: number,
    columnIndex?: number
  ) => ReactNode | string;
  fixedWidth?: number;
  children?: Omit<IDataHeader<TDataSource>, 'freezed'>[];
}
```

Beberapa atribut yang perlu diketahui:

- _**freezed**_ untuk menentukan kolom mana yang akan stikcky posisi nya.
- _**filterOptions**_ opsi filter yang akan muncul, berupa array srtring.
- _**render**_ untuk menampilkan value ke cell namun dengan customisasi baik dari react node atau string dengan formatting.
- _**renderSummary**_ untuk menampilkan value pada footer (jika menggunakan footer).
- _**fixedWidth**_ untuk memberikan ukuran spesifik kepada suatu kolom.
- _**children**_ untuk membuat kolom group atau membuat sub header dengan isian data atau property sama seperti parent nya hanya saja tanpa _**freezed.**_
- _**useHeaderAction**_ untuk opsi menampilkan atau menghilangkan burger icon pada header.
