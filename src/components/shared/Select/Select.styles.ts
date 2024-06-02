import styled from "styled-components";

export const SelectWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const SelectField = styled.select`
  appearance: none;
  width: 120px;
  padding: 8px 30px 8px 10px;
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
`;

export const SelectIcon = styled.span`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  font-size: 14px;
  color: #999;
  pointer-events: none;
`;
