import clsx from 'clsx';
import Toast from './toast';
import ToastContext from './toast-service';
import { IToast, IToastProvider, TToastVariant } from './types';
import { useCallback, useState } from 'react';

const TOAST_POSITION = {
  'top-right': 'top--4 right-4 items-end',
  'top-left': 'top-4 left-4',
  'bottom-right': 'bottom-4 right-4 items-end',
  'bottom-left': 'bottom-4 left-4',
  center: 'top-4 left-1/2 -translate-x-1/2 items-center',
};

export default function ToastProvider({ children, position = 'bottom-right', duration }: IToastProvider) {
  const [toasts, setToasts] = useState<IToast[]>([]);

  const open = (toastType: TToastVariant = 'info', message: string) => {
    const id = Math.random().toString(36).substring(2, 15);

    setToasts((prevToasts) => [
      ...prevToasts,
      {
        id,
        message,
        toastType,
        onClose: () => setToasts(prevToasts.filter(({ id: prevId }) => prevId !== id)),
      },
    ]);

    if (duration) {
      setTimeout(() => close(id), duration);
    }
  };

  const close = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, open, close }}>
      {children}

      <div className={clsx('flex flex-col w-max space-y-2 absolute overflow-hidden', TOAST_POSITION[position])}>
        {toasts.map(({ id, message, toastType }) => (
          <Toast
            key={id}
            id={id}
            message={message}
            toastType={toastType}
            duration={duration}
            onClose={() => close(id)}
            transitionPosition={position.includes('bottom') ? 'bottom' : 'top'}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}
