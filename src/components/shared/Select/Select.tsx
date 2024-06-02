import React, { FC, useMemo } from "react";
import { SelectField, SelectIcon, SelectWrapper } from "./Select.styles";

interface SelectProps {
  value: number;
  onChange: (value: number) => void;
  options: { label: string; value: number }[];
}

const Select: FC<SelectProps> = ({ value, onChange, options }) => {
  const renderOptions = useMemo(() => {
    return options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ));
  }, [options]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = Number(e.target.value);
    onChange(selectedValue);
  };

  return (
    <SelectWrapper>
      <SelectField value={value} onChange={handleChange}>
        <>{renderOptions}</>
      </SelectField>
      <SelectIcon>▼</SelectIcon>
    </SelectWrapper>
  );
};

export default Select;
