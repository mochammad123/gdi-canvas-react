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
  success: 'text-white bg-navy-100',
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

export default function Toast({ toastType, message, duration, onClose, transitionPosition = 'bottom-right', animationClosed }: IToast) {
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
      data-testid={`toast-${toastType}`}
      className={clsx(
        'rounded-md p-3 transition-all duration-500 transform',
        {
          '-translate-y-96': transitionPosition === 'center' && !isVisible,
          '-translate-x-96': (transitionPosition === 'bottom-left' || transitionPosition === 'top-left') && !isVisible,
          'translate-x-96': (transitionPosition === 'bottom-right' || transitionPosition === 'top-right') && !isVisible,
        },
        {
          '-translate-x-96': (transitionPosition === 'bottom-left' || transitionPosition === 'top-left') && animationClosed,
          'translate-x-96': (transitionPosition === 'bottom-right' || transitionPosition === 'top-right') && animationClosed,
        },
        {
          'translate-x-96': transitionPosition === 'center' && animationClosed,
        },
        TOAST_THEME[toastType]
      )}
    >
      <div className="flex justify-between gap-5 items-center">
        <div className="flex-shrink-0">
          <div className={clsx('flex justify-center items-center size-6 rounded-full', ICON_BACKGROUND[toastType])}>{TOAST_ICON[toastType]}</div>
        </div>

        <Typography as="global-paragraph">{message}</Typography>

        <Button
          size="sm"
          className="text-navy-100 shadow-none !p-0 !m-0"
          variant="text"
          LeftIcon={() => <CloseIcon color="white" />}
          onClick={onClose}
        ></Button>
      </div>
    </div>
  );
}
