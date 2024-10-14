import { Button } from '@/components/button';
import { useToast } from '@/components/toast';
import { TToastVariant } from '@/components/toast/types';
import { Typography } from '@/components/typhography';

export default function Experiment() {
  const toast = useToast();

  const handleTriggerToast = (type: TToastVariant) => {
    switch (type) {
      case 'success':
        return toast.open('success', 'This is a success toast');
      case 'error':
        return toast.open('error', 'This is a error toast');
      case 'info':
        return toast.open('info', 'This is a info toast');
      case 'warning':
        return toast.open('warning', 'This is a warning toast yohohoho');
      default:
        return;
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center p-10">
      <Typography as="h4">Experiment</Typography>

      <div className="mt-10 grid grid-cols-3 w-full gap-3">
        <div className="w-full p-2 rounded shadow">
          <div className="w-full h-max flex flex-col space-y-2">
            <Typography as="h6">Toast</Typography>

            <div className="flex flex-row space-x-2">
              <Button size="sm" className="!bg-green-500 border-none" onClick={() => handleTriggerToast('success')}>
                Success
              </Button>
              <Button size="sm" className="bg-red-500 border-none" onClick={() => handleTriggerToast('error')}>
                Error
              </Button>
              <Button size="sm" className="bg-yellow-500 border-none" onClick={() => handleTriggerToast('warning')}>
                Warning
              </Button>
              <Button size="sm" className="!bg-blue-500 border-none" onClick={() => handleTriggerToast('info')}>
                Info
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
