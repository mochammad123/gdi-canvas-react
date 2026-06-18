import { Button } from '@knittotextile/react-ui';
import Modal from '@/components/ui/modal';
import { useModal } from '@/lib/hooks/hooks';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';

const MODAL_TITLE = 'Modal Title';
const MODAL_CONTENT = 'Modal Content';

function ModalComponentTest() {
  const { show, showModal, hideModal } = useModal<'modal-test'>();

  return (
    <div>
      <Button onClick={() => showModal('modal-test')}>Show Modal</Button>
      {show && (
        <Modal show={show} title={MODAL_TITLE} onHide={hideModal}>
          <Modal.Content>
            <p>{MODAL_CONTENT}</p>
          </Modal.Content>
          <div className="flex justify-end p-2">
            <Button onClick={() => hideModal()}>Hide Modal</Button>
          </div>
        </Modal>
      )}
    </div>
  );
}

describe('Hooks Test', () => {
  it('seharusnya menampilkan button show modal dan modal tidak tampil', async () => {
    const screen = await render(<ModalComponentTest />);
    expect(screen.container.textContent).not.toContain(MODAL_TITLE);
    expect(screen.container.textContent).not.toContain(MODAL_CONTENT);
  });

  it('seharusnya menampilkan modal ketika button show modal diklik', async () => {
    const screen = await render(<ModalComponentTest />);
    const showModalButton = screen.getByText('Show Modal');

    await showModalButton.click();
    await expect.element(screen.getByText(MODAL_TITLE)).toBeInTheDocument();
    await expect.element(screen.getByText(MODAL_CONTENT)).toBeInTheDocument();
  });

  it('seharusnya menutup modal ketika button hide modal diklik', async () => {
    const screen = await render(<ModalComponentTest />);
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
