import Spinner from '@/components/icon/spinner';
import Confirmation from '@/components/modal/modal-confirmation';
import { IModalConfirmationProps } from '@/components/modal/types';
import { Button } from '../button';

export default function ConfirmationDelete({
  show,
  onHide,
  onConfirm,
  isLoading,
}: IModalConfirmationProps & { onConfirm: () => void; isLoading: boolean }) {
  return (
    <Confirmation show={show} onHide={onHide} onConfirm={() => ''} hideButton>
      <h1 className="text-2xl text-center font-bold text-gray-900 mt-1">Apakah anda yakin ingin menghapusnya ?</h1>
      <div className="flex gap-x-2 justify-center mt-6 px-5">
        <Button variant="outline" onClick={onHide} disabled={isLoading} className="shrink-0 !w-1/2">
          Cancel
        </Button>
        <Button className="w-1/2 flex items-center space-x-2.5" onClick={onConfirm} disabled={isLoading}>
          {isLoading ? <Spinner /> : 'Ya'}
        </Button>
      </div>
    </Confirmation>
  );
}
