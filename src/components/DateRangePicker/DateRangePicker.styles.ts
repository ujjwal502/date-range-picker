import styled from "styled-components";

export const DateRangePickerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
