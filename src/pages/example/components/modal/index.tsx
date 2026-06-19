import { Button, Modal, Typography, useOverlayState } from '@knittotextile/react-ui';
import { ReactNode, useState } from 'react';

export default function ModalPage() {
  const basicModal = useOverlayState();
  const confirmModal = useOverlayState();
  const sizeModal = useOverlayState();
  const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md');

  return (
    <div className="p-4 flex flex-col gap-3 mb-10">
      <Typography as="h3">Modal</Typography>
      <div className="h-2 w-72 bg-burnt-orange-100" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card title="Basic">
          <Button color="navy" onClick={basicModal.open}>
            Buka Modal
          </Button>
          <Modal isOpen={basicModal.isOpen} onOpenChange={basicModal.setOpen}>
            <Modal.Backdrop>
              <Modal.Container size="md">
                <Modal.Dialog>
                  <Modal.Header>
                    <Modal.Heading>Judul Modal</Modal.Heading>
                    <Modal.CloseTrigger />
                  </Modal.Header>
                  <Modal.Body>
                    <Typography as="global-paragraph">Konten modal dasar dengan backdrop dan tombol tutup.</Typography>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="outline" color="navy" onClick={basicModal.close}>
                      Tutup
                    </Button>
                  </Modal.Footer>
                </Modal.Dialog>
              </Modal.Container>
            </Modal.Backdrop>
          </Modal>
        </Card>

        <Card title="Confirmation">
          <Button color="burnt-orange" onClick={confirmModal.open}>
            Konfirmasi Hapus
          </Button>
          <Modal isOpen={confirmModal.isOpen} onOpenChange={confirmModal.setOpen}>
            <Modal.Backdrop isDismissable={false}>
              <Modal.Container size="sm">
                <Modal.Dialog aria-label="Konfirmasi hapus">
                  <Modal.Header>
                    <Modal.Heading>Hapus Data?</Modal.Heading>
                  </Modal.Header>
                  <Modal.Body>
                    <Typography as="global-paragraph">Data yang dihapus tidak dapat dikembalikan.</Typography>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="outline" color="navy" onClick={confirmModal.close}>
                      Batal
                    </Button>
                    <Button color="burnt-orange" onClick={confirmModal.close}>
                      Hapus
                    </Button>
                  </Modal.Footer>
                </Modal.Dialog>
              </Modal.Container>
            </Modal.Backdrop>
          </Modal>
        </Card>

        <Card title="Size">
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              color="navy"
              onClick={() => {
                setSize('sm');
                sizeModal.open();
              }}
            >
              Small
            </Button>
            <Button
              variant="outline"
              color="navy"
              onClick={() => {
                setSize('md');
                sizeModal.open();
              }}
            >
              Medium
            </Button>
            <Button
              variant="outline"
              color="navy"
              onClick={() => {
                setSize('lg');
                sizeModal.open();
              }}
            >
              Large
            </Button>
          </div>
          <Modal isOpen={sizeModal.isOpen} onOpenChange={sizeModal.setOpen}>
            <Modal.Backdrop variant="blur">
              <Modal.Container size={size}>
                <Modal.Dialog>
                  <Modal.Header>
                    <Modal.Heading>Modal {size.toUpperCase()}</Modal.Heading>
                    <Modal.CloseTrigger />
                  </Modal.Header>
                  <Modal.Body>
                    <Typography as="global-paragraph">Ukuran container: {size}</Typography>
                  </Modal.Body>
                </Modal.Dialog>
              </Modal.Container>
            </Modal.Backdrop>
          </Modal>
        </Card>

        <Card title="Backdrop Variant">
          <Typography as="global-paragraph" className="text-black-60 dark:text-black-40">
            Backdrop mendukung <code>opaque</code>, <code>blur</code>, dan <code>transparent</code>. Contoh blur ada di card Size.
          </Typography>
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
