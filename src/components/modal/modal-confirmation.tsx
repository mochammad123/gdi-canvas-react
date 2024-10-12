import Modal, { Backdrop } from ".";
import Button from "../button";
import ButtonCancel from "../button/ButtonCancel";
import Spinner from "../icon/Spinner";
import Portal from "../Portal";
import { IModalConfirmationProps } from "./types";

export default function Confirmation({
  onHide,
  show,
  title,
  subTitle,
  children,
  buttonCancelText,
  buttonConfirmText,
  onConfirm,
  isLoading,
  hideButton = false,
}: IModalConfirmationProps & {
  hideButton?: boolean;
  buttonConfirmText?: string;
  buttonCancelText?: string;
  onConfirm: (cb?: () => void) => void;
  isLoading?: boolean;
}) {
  return (
    <>
      <Modal
        preventShortcut
        preventOutsideClick
        size="!w-[350px]"
        onHide={onHide}
        show={show}
        centered
        noBackdrop
        className="!z-[1001]"
        enableResizeObserver={false}
      >
        <Modal.Content className="!py-8">
          {children ? (
            children
          ) : (
            <div className="flex flex-col items-center gap-y-2">
              <h1 className="text-3xl font-semibold text-gray-900">{title}</h1>
              <div>{subTitle}</div>
            </div>
          )}
          {!hideButton && (
            <div className="mt-4 flex gap-x-3 justify-center">
              <ButtonCancel
                text={buttonCancelText}
                onClick={onHide}
                disabled={isLoading}
              />
              <Button
                disabled={isLoading}
                className="px-3 flex justify-center items-center"
                onClick={() => {
                  onConfirm(() => {
                    onHide && onHide();
                  });
                }}
              >
                {isLoading ? <Spinner /> : buttonConfirmText}
              </Button>
            </div>
          )}
        </Modal.Content>
      </Modal>
      {show && (
        <Portal>
          <Backdrop className="!z-[1000]" />
        </Portal>
      )}
    </>
  );
}
