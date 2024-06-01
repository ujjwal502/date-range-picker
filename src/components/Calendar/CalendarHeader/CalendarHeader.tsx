import { FC, useMemo } from "react";
import {
  CalendarHeaderWrapper,
  SelectField,
  SelectIcon,
  SelectWrapper,
} from "./CalendarHeader.styles";

interface CalendarHeaderPropsModel {
  handleMonthChange: (month: number) => void;
  handleYearChange: (year: number) => void;
  displayYear: number;
  displayMonth: number;
}

const CalendarHeader: FC<CalendarHeaderPropsModel> = ({
  handleMonthChange,
  handleYearChange,
  displayYear,
  displayMonth,
}) => {
  const renderYearsList = useMemo(() => {
    return Array.from(
      { length: 100 },
      (_, i) => new Date().getFullYear() - 50 + i
    ).map((year) => (
      <option key={year} value={year}>
        {year}
      </option>
    ));
  }, []);

  const renderMonthsList = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => i).map((month) => (
      <option key={month} value={month}>
        {new Date(displayYear, month).toLocaleString("default", {
          month: "long",
        })}
      </option>
    ));
  }, [displayYear]);

  const onYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleYearChange(Number(e.target.value));
  };

  const onMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleMonthChange(Number(e.target.value));
  };

  return (
    <CalendarHeaderWrapper>
      <SelectWrapper>
        <SelectField value={displayYear} onChange={onYearChange}>
          <>{renderYearsList}</>
        </SelectField>
        <SelectIcon>▼</SelectIcon>
      </SelectWrapper>
      <SelectWrapper>
        <SelectField value={displayMonth} onChange={onMonthChange}>
          <>{renderMonthsList}</>
        </SelectField>
        <SelectIcon>▼</SelectIcon>
      </SelectWrapper>
    </CalendarHeaderWrapper>
  );
};

export default CalendarHeader;
