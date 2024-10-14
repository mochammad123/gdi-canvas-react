export type TToastVariant = 'success' | 'error' | 'warning' | 'info';
export type TToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'center';

interface IToast {
  id: string;
  toastType: TToastVariant;
  message: string;
  duration?: number;
  transitionPosition?: 'bottom' | 'top';
  onClose: () => void;
}

export interface IToastProvider {
  children: React.ReactNode;
  position?: TToastPosition;
  duration?: number;
}

interface IToastContext {
  toasts: IToast[];
  open: (toastType: TToastVariant, message: string) => void;
  close: (id: string) => void;
}
