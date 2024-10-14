import clsx from 'clsx';
import { IToast } from './types';
import CloseIcon from '../icon/close';
import { Button } from '../button';
import { Typography } from '../typhography';
import CheckIcon from '../icon/check';
import WarningIcon from '../icon/warning';
import { useEffect, useState } from 'react';

const TOAST_THEME = {
  error: 'bg-red-50 text-red-800',
  success: 'bg-green-50 text-green-800',
  warning: 'bg-yellow-50 text-yellow-800',
  info: 'bg-blue-50 text-blue-800',
};

const ICON_BACKGROUND = {
  error: 'bg-red-800',
  success: 'bg-green-800',
  warning: 'bg-yellow-800',
  info: 'bg-blue-800',
};

const TOAST_ICON = {
  success: <CheckIcon className="!size-2.5" />,
  error: <CloseIcon className="!size-2.5" />,
  warning: <WarningIcon className="!size-2.5" />,
  info: <WarningIcon className="!size-2.5" />,
};

export default function Toast({ toastType, message, duration, onClose, transitionPosition = 'bottom' }: IToast) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    if (duration) {
      const hideTimeout = setTimeout(() => {
        setIsVisible(false);
      }, duration);

      const removeTimeout = setTimeout(() => {
        onClose();
      }, duration + 300);

      return () => {
        clearTimeout(hideTimeout);
        clearTimeout(removeTimeout);
      };
    }
  }, [duration, onClose]);

  return (
    <div
      className={clsx(
        'rounded-md p-3 w-max transition-all duration-300 transform',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6',
        transitionPosition === 'top' && !isVisible ? '-translate-y-6' : '',
        transitionPosition === 'bottom' && !isVisible ? 'translate-y-6' : '',
        TOAST_THEME[toastType]
      )}
    >
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <div className={clsx('flex justify-center items-center size-6 rounded-full', ICON_BACKGROUND[toastType])}>{TOAST_ICON[toastType]}</div>
        </div>

        <Typography as="global-paragraph" className="text-sm font-medium ms-2">
          {message}
        </Typography>

        <div className="ml-auto pl-5">
          <Button size="sm" className="!text-sm !bg-blue-50 rounded !border-black-20 shadow-none !text-black-60" onClick={onClose}>
            Dismiss
          </Button>
        </div>
      </div>
    </div>
  );
}
