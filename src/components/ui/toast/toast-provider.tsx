import clsx from 'clsx';
import Toast from './toast';
import ToastContext from './toast-service';
import { IToast, IToastProvider, TToastVariant } from './types';
import { useCallback, useState } from 'react';

const TOAST_POSITION = {
  'top-right': 'top--4 right-0 pr-4 items-end',
  'top-left': 'top-4 left-0 pl-4',
  'bottom-right': 'bottom-4 right-0 pr-4 items-end',
  'bottom-left': 'bottom-4 left-0 pl-4',
  center: 'top-4 left-1/2 -translate-x-1/2 items-center',
};

/**
 * Cara menggunakan:
 *   1. Bungkus halaman yang ingin dipasangkan toast dengan <ToastProvider>.
 *      Beri property position untuk mengatur posisi toast.
 *      Beri property duration untuk mengatur durasi toast.
 *      property position dan duration berfisat opsional.
 *
 *   2. Gunakan fungsi toast.open("tipe_toast", "pesan") dari useToast() untuk membuat toast.
 *      tipe_toast adalah success, error, warning, info.
 *      pesan adalah string.
 *
 */

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
        animationClosed: false,
      },
    ]);

    if (duration) {
      setTimeout(() => close(id), duration);
    }
  };

  const close = useCallback((id: string) => {
    setToasts((prevToasts) =>
      prevToasts.map((data) => {
        return { ...data, animationClosed: data.id === id ? true : false };
      })
    );

    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, 300);
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, open, close }}>
      {children}

      <div
        className={clsx('flex flex-col gap-2 fixed z-[9999999] overflow-hidden', TOAST_POSITION[position], {
          'flex-col-reverse': position === 'center',
        })}
      >
        {toasts.map(({ id, message, toastType, animationClosed }) => (
          <Toast
            key={id}
            id={id}
            message={message}
            toastType={toastType}
            duration={duration}
            onClose={() => close(id)}
            transitionPosition={position}
            animationClosed={animationClosed}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}
