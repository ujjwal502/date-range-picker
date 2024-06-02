import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  .modal-close {
    text-align: end;
    margin-bottom: 30px;
    cursor: pointer;
  }
`;

export const ModalClose = styled.div`
  text-align: end;
  margin-bottom: 30px;
  cursor: pointer;
`;

export const ModalFooterButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  button {
    width: 180px;
    padding: 8px 12px;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    padding: 8px 12px;
    background-color: #007bff;
  }

  button:disabled {
    background-color: #007bff52;
    pointer-events: none;
  }

  .button-clear {
    border: 1px solid #007bff;
    color: black;
    background: white;
  }
`;
