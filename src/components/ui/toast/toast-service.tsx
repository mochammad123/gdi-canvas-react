import { createContext, useContext } from 'react';
import { IToastContext } from './types';

const ToastContext = createContext<IToastContext>({
  toasts: [],
  open: () => {},
  close: () => {},
});

export const useToast = () => useContext(ToastContext);
export default ToastContext;
