import { useSensorKeyboard } from '@/lib/hooks';
import clsx from 'clsx';
import React, { useEffect, useMemo, useRef } from 'react';
import CloseIcon from '../icon/Close';
import KNUI from '../KNUI';
import Portal from '../Portal';
import { Typography } from '../typhography';
import { IModalProps } from './types';

export default function Modal({
  onHide,
  show,
  size = 'default',
  title,
  children,
  identity,
  centered,
  noBackdrop = false,
  className,
  preventOutsideClick = false,
  enableResizeObserver = true,
  preventShortcut = false,
}: IModalProps & {
  identity?: string;
  className?: string;
  size?: string;
  title?: string | React.ReactNode;
  children: React.ReactNode;
  centered?: boolean;
  noBackdrop?: boolean;
  preventOutsideClick?: boolean;
  enableResizeObserver?: boolean;
  preventShortcut?: boolean;
}) {
  const modalSize = useMemo(
    () => ({
      [size]: size,
      small: 'max-w-[21.4375rem]',
      medium: 'w-full max-w-[31.25rem]',
      large: 'max-w-[59.375rem]',
      extraLarge: 'max-w-[75rem]',
      default: 'w-full max-w-[38.4375rem]',
    }),
    [size]
  );

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const modalEl = modalRef.current;
    if (!modalEl || !enableResizeObserver) return;
    const resizeObserver = new ResizeObserver((entries) => {
      const modalcontentEl = entries[0].target.querySelector('.modal-content');
      const tolerance = 50;
      const modalHeight = modalcontentEl?.clientHeight || 0;
      if (modalHeight > window.innerHeight - tolerance) {
        document.body.classList.add('modal-open');
        return;
      }
      document.body.classList.remove('modal-open');
    });
    resizeObserver.observe(modalRef.current);
    return () => {
      resizeObserver.unobserve(modalEl);
    };
  }, [enableResizeObserver, show]);

  useSensorKeyboard(['Escape'], () => {
    if (!show || preventShortcut) return;
    hideModal();
  });

  const hideModal = () => {
    onHide && onHide();
    document.body.classList?.remove('modal-open');
  };
  if (!show) return null;
  return (
    <Portal>
      <div
        ref={modalRef}
        className={clsx('modal', className)}
        onClick={(e) => {
          if (preventOutsideClick) return;
          const target = e.target as HTMLElement;
          if (!target?.classList?.contains('modal')) return;
          hideModal();
        }}
      >
        <div
          className={clsx('modal-dialog', modalSize[size], {
            centered: centered,
          })}
        >
          <div className={clsx('modal-content')}>
            {title && <ModalTitle onHide={() => hideModal()}>{title}</ModalTitle>}
            {children}
          </div>
        </div>
      </div>
      {!noBackdrop && <Backdrop />}
    </Portal>
  );
}

function ModalTitle({ children, onHide }: { children: React.ReactNode; onHide: () => void }) {
  return (
    <div className="p-4 flex justify-between">
      <Typography as="global-strong">{children}</Typography>
      <div onClick={onHide} className="w-[1.375rem] hover:opacity-65 cursor-pointer h-[1.375rem] flex justify-center items-center">
        <CloseIcon className="w-[22px]" />
      </div>
    </div>
  );
}

function ModalContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={clsx('p-4', className)}>{children}</div>;
}

export function Backdrop({ className }: { className?: string }) {
  return <div className={clsx('modal-backdrop', className)}></div>;
}

Modal.Title = ModalTitle;
Modal.Content = ModalContent;
