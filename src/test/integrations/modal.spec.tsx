import { Button, Modal, useOverlayState } from '@knittotextile/react-ui';
import { describe, expect, it } from 'vitest';
import { renderWithProviders } from '../test-utils';

const MODAL_TITLE = 'Modal Title';
const MODAL_CONTENT = 'Modal Content';

function ModalComponentTest() {
  const { isOpen, open, close, setOpen } = useOverlayState();

  return (
    <div>
      <Button onClick={open}>Show Modal</Button>
      <Modal isOpen={isOpen} onOpenChange={setOpen}>
        <Modal.Backdrop>
          <Modal.Container size="sm">
            <Modal.Dialog>
              <Modal.Header>
                <Modal.Heading>{MODAL_TITLE}</Modal.Heading>
              </Modal.Header>
              <Modal.Body>
                <p>{MODAL_CONTENT}</p>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={close}>Hide Modal</Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
}

describe('Modal Integration Test', () => {
  it('seharusnya menampilkan button show modal dan modal tidak tampil', async () => {
    const screen = await renderWithProviders(<ModalComponentTest />);
    expect(screen.container.textContent).not.toContain(MODAL_TITLE);
    expect(screen.container.textContent).not.toContain(MODAL_CONTENT);
  });

  it('seharusnya menampilkan modal ketika button show modal diklik', async () => {
    const screen = await renderWithProviders(<ModalComponentTest />);
    const showModalButton = screen.getByText('Show Modal');

    await showModalButton.click();
    await expect.element(screen.getByText(MODAL_TITLE)).toBeInTheDocument();
    await expect.element(screen.getByText(MODAL_CONTENT)).toBeInTheDocument();
  });

  it('seharusnya menutup modal ketika button hide modal diklik', async () => {
    const screen = await renderWithProviders(<ModalComponentTest />);
    const showModalButton = screen.getByText('Show Modal');
    const hideModalButton = screen.getByText('Hide Modal');

    await showModalButton.click();

    await expect.element(screen.getByText(MODAL_TITLE)).toBeInTheDocument();
    await expect.element(screen.getByText(MODAL_CONTENT)).toBeInTheDocument();

    await hideModalButton.click();
    await expect.element(screen.getByText(MODAL_TITLE)).not.toBeInTheDocument();
    await expect.element(screen.getByText(MODAL_CONTENT)).not.toBeInTheDocument();
  });
});
