# Big Calendar

Komponen Big Calendar adalah sebuah komponen kalender yang dapat menampilkan jadwal atau event dalam format bulanan. Komponen ini dibangun dan bergantung pada library _**dayjs**_ untuk menampilkan data tanggalnya, sehingga pastikan library tersebut sudah terinstall dengan baik.

Tech Stack: _**ReactJS(Typescript)**_, _**TailwindCSS**_, _**dayjs**_

## Atribut

atribut komponen utama Big Calendar
| Nama | Tipe Data | Default | Fungsi |
| ------ | ------ | ------ | ------ |
| currentDate | `string` | `dayjs().format('MM-YYYY')` | Menentukan bulan dan tahun yang ditampilkan. Format harus sesuai dengan `dateFormat`. Minimal format harus terdiri dari **bulan** dan **tahun** |
| dateFormat | `string` | `'MM-YYYY'` | Format tanggal untuk `currentDate`. Minimal **harus** memuat format bulan (M/MM) dan tahun (YY/YYYY) |
| schedules | `ISchedule[]` | `[]` | Array atau kumpulan data dari jadwal yang akan ditampilkan |
| scheduleDateFormat | `string` | `'YYYY-MM-DD'` | Format tanggal untuk `startDate` dan `endDate` dalam `ISchedule` |
| maxVisibleSlots | `number` | `4` | Jumlah maksimal slot jadwal yang ditampilkan per sel tanggal |
| stylesConfig | `StylesConfig` | `{ cellWeekHeight: 200 }` | Konfigurasi styling untuk kalender. Saat ini hanya tersedia untuk mengatur tinggi dari sel tanggal |
| dayConfig | `IDayConfig` | `{ format: 'ddd', locale: 'en' }` | Konfigurasi format dan bahasa untuk nama hari |
| callbackDateConfig | `IDateConfig` | `{ format: 'YYYY-MM-DD', locale: 'en' }` | Format tanggal untuk nilai callback pada event handler |
| overflowScheduleMessage | `(schedules: ISchedule[]) => string` | `(schedules) => "+ ${schedules.length} Schedule more"` | Fungsi untuk mengkustomisasi pesan overflow jadwal |

## Event Handlers

| Nama                     | Tipe Data                                                  | Deskripsi                               |
| ------------------------ | ---------------------------------------------------------- | --------------------------------------- |
| onScheduleClick          | `(data: { date: string; schedule: ISchedule }) => void`    | Dipanggil ketika jadwal diklik          |
| onOverflowSchedulesClick | `(data: { date: string; schedules: ISchedule[] }) => void` | Dipanggil ketika overflow jadwal diklik |
| onDayClick               | `(data: { date: string; schedules: ISchedule[] })`         | Dipanggil ketika sel tanggal diklik     |

## Interface

```typescript
interface ISchedule {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  backgroundColor?: string; // Opsional, default: '#0F163F'
  textColor?: string; // Opsional, default: '#ffffff'
}

interface StylesConfig {
  cellWeekHeight: number;
}

interface IDayConfig {
  format: 'd' | 'dd' | 'ddd' | 'dddd';
  locale: 'id' | 'en';
}

interface IDateConfig {
  format: string;
  locale: 'id' | 'en';
}
```

## Contoh Penggunaan

```tsx
import { BigCalendar } from '@/components/ui/big-calendar';

const MyCalendarComponent = () => {
  const sampleSchedules = [
    {
      id: '1',
      title: 'Introduction to Big Calendar',
      startDate: '2025-05-01',
      endDate: '2025-05-19',
      backgroundColor: '#456EF4',
      textColor: '#ffffff',
    },
  ];

  return (
    <BigCalendar
      currentDate="05-2025"
      dateFormat="MM-YYYY"
      schedules={sampleSchedules}
      maxVisibleSlots={4}
      dayConfig={{
        format: 'ddd',
        locale: 'en',
      }}
      scheduleDateFormat="YYYY-MM-DD"
      callbackDateConfig={{
        format: 'dddd, D MMM YYYY',
        locale: 'en',
      }}
      stylesConfig={{
        cellWeekHeight: 200,
      }}
      onDayClick={({ date, schedules }) => {
        console.log(`Clicked date: ${date}, Total schedules: ${schedules.length}`);
      }}
      onScheduleClick={({ date, schedule }) => {
        console.log(`Clicked schedule: ${schedule.title} on ${date}`);
      }}
      overflowScheduleMessage={(schedules) => `${schedules.length} jadwal lainnya`}
    />
  );
};
```

## Format Tanggal yang Didukung

Komponen ini menggunakan _**dayjs**_ untuk manipulasi tanggal, sehingga mendukung semua format yang didukung oleh _**dayjs**_. Beberapa format yang umum digunakan:

| Format | Contoh           | Deskripsi                  |
| ------ | ---------------- | -------------------------- |
| `YYYY` | 2025             | Tahun lengkap              |
| `YY`   | 25               | Tahun 2 digit              |
| `MM`   | 01-12            | Bulan dalam angka          |
| `MMM`  | Jan-Dec          | Nama bulan singkat         |
| `MMMM` | January-December | Nama bulan lengkap         |
| `DD`   | 01-31            | Tanggal                    |
| `D`    | 1-31             | Tanggal tanpa leading zero |
| `ddd`  | Sun-Sat          | Nama hari singkat          |
| `dddd` | Sunday-Saturday  | Nama hari lengkap          |
