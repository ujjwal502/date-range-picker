import { FC, ReactNode, RefObject } from "react";
import {
  ModalOverlay,
  ModalContent,
  ModalClose,
  ModalFooterButtonWrapper,
} from "./Modal.styles";

export type ButtonConfig = {
  id: number;
  className: string;
  handler: () => void;
  disabled: boolean;
  text: string;
};

export interface ModalPropsModel {
  isOpen: boolean;
  onClose: () => void;
  footerButtons: ButtonConfig[];
  children: ReactNode;
  modalRef: RefObject<HTMLDivElement>;
}

const Modal: FC<ModalPropsModel> = ({
  isOpen,
  onClose,
  children,
  footerButtons,
  modalRef,
}) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay data-testid="modal">
      <ModalContent ref={modalRef}>
        <ModalClose onClick={onClose}>❌</ModalClose>
        {children}
        {footerButtons && (
          <ModalFooterButtonWrapper>
            {footerButtons.map((config) => (
              <button
                key={config.id}
                className={config.className}
                onClick={config.handler}
                disabled={config.disabled}
              >
                {config.text}
              </button>
            ))}
          </ModalFooterButtonWrapper>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
