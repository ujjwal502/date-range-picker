import { FC, useMemo } from "react";
import { CalendarHeaderWrapper } from "./CalendarHeader.styles";
import Select from "../../shared/Select/Select";

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
  const generateYearsOptions = (startYear: number, endYear: number) => {
    return Array.from({ length: endYear - startYear + 1 }, (_, i) => {
      const year = startYear + i;
      return { label: String(year), value: year };
    });
  };

  const generateMonthsOptions = (year: number) => {
    return Array.from({ length: 12 }, (_, i) => {
      const month = i;
      const monthName = new Date(year, month).toLocaleString("default", {
        month: "long",
      });
      return { label: monthName, value: month };
    });
  };

  const yearsOptions = useMemo(() => {
    const startYear = new Date().getFullYear() - 50;
    const endYear = new Date().getFullYear() + 49;
    return generateYearsOptions(startYear, endYear);
  }, []);

  const monthsOptions = useMemo(() => {
    return generateMonthsOptions(displayYear);
  }, [displayYear]);

  return (
    <CalendarHeaderWrapper>
      <Select
        value={displayYear}
        onChange={handleYearChange}
        options={yearsOptions}
      />
      <Select
        value={displayMonth}
        onChange={handleMonthChange}
        options={monthsOptions}
      />
    </CalendarHeaderWrapper>
  );
};

export default CalendarHeader;
