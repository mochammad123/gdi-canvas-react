export interface IModalProps {
  show: boolean;
  onHide?: (data?: unknown) => void;
}

export interface IModalConfirmationProps extends IModalProps {
  subTitle?: string;
  title?: string;
  children?: React.ReactNode;
}
