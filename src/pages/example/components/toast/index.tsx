import { Button, Typography, useToast } from '@knittotextile/react-ui';
import { ReactNode } from 'react';

export default function ToastPage() {
  const toast = useToast();

  return (
    <div className="p-4 flex flex-col gap-3 mb-10">
      <Typography as="h3">Toast</Typography>
      <div className="h-2 w-72 bg-burnt-orange-100" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card title="Variant">
          <div className="flex flex-wrap gap-3">
            <Button color="navy" onClick={() => toast.show({ variant: 'success', message: 'Data berhasil disimpan' })}>
              Success
            </Button>
            <Button color="burnt-orange" onClick={() => toast.show({ variant: 'error', message: 'Terjadi kesalahan saat menyimpan data' })}>
              Error
            </Button>
            <Button color="steel-blue" onClick={() => toast.show({ variant: 'warning', message: 'Periksa kembali data yang diinput' })}>
              Warning
            </Button>
            <Button variant="outline" color="navy" onClick={() => toast.show({ variant: 'info', message: 'Informasi tambahan untuk pengguna' })}>
              Info
            </Button>
          </div>
        </Card>

        <Card title="With Title">
          <Button
            color="navy"
            onClick={() =>
              toast.show({
                variant: 'success',
                title: 'Berhasil',
                message: 'Perubahan data telah disimpan ke server',
              })
            }
          >
            Toast dengan Title
          </Button>
        </Card>

        <Card title="Position">
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" color="navy" onClick={() => toast.show({ variant: 'info', message: 'Top right', position: 'top-right' })}>
              Top Right
            </Button>
            <Button variant="outline" color="navy" onClick={() => toast.show({ variant: 'info', message: 'Top center', position: 'top-center' })}>
              Top Center
            </Button>
            <Button variant="outline" color="navy" onClick={() => toast.show({ variant: 'info', message: 'Bottom right', position: 'bottom-right' })}>
              Bottom Right
            </Button>
            <Button
              variant="outline"
              color="navy"
              onClick={() => toast.show({ variant: 'info', message: 'Bottom center', position: 'bottom-center' })}
            >
              Bottom Center
            </Button>
          </div>
        </Card>

        <Card title="Duration">
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" color="navy" onClick={() => toast.show({ variant: 'info', message: 'Toast 2 detik', duration: 2000 })}>
              2 detik
            </Button>
            <Button
              variant="outline"
              color="navy"
              onClick={() => toast.show({ variant: 'info', message: 'Toast permanen (klik × untuk tutup)', duration: 0 })}
            >
              Permanen
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

const Card = ({ title, children }: { title: string; children: ReactNode }) => {
  return (
    <div className="p-4 flex flex-col gap-4 bg-white dark:bg-black-80 shadow-md h-max">
      <Typography as="h4" className="text-navy-100 dark:text-greyish-semi-white">
        {title}
      </Typography>
      {children}
    </div>
  );
};
