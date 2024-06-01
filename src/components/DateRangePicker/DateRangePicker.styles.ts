import styled from "styled-components";

export const DateRangePickerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

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

export const InputWrapper = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
`;

export const InputField = styled.input`
  width: 220px;
  padding: 10px 40px 10px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
  background-color: #fff;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.2);
  }

  &::placeholder {
    color: #999;
  }
`;

export const InputIcon = styled.span`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  font-size: 18px;
  color: #999;
`;

export const CalendarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  border-bottom: 1px solid #99999945;
`;

export const VerticalDivider = styled.div`
  border: 1px solid #99999945;
`;

export const CalendarFooterButtonWrapper = styled.div`
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

  .button-clear {
    border: 1px solid #007bff;
    color: black;
    background: white;
  }
`;
