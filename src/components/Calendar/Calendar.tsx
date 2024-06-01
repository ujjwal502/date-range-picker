import { FC, useMemo } from "react";

import { CalenderPropsModel } from "./Calendar.types";
import {
  CalendarDays,
  CalendarWeekDays,
  CalendarWrapper,
} from "./Calendar.styles";
import CalendarHeader from "./CalendarHeader/CalendarHeader";
import { getDaysInMonth, weekDays } from "./calendar.utils";

const Calendar: FC<CalenderPropsModel> = ({
  displayYear,
  displayMonth,
  startDate,
  endDate,
  handleDateClick,
  isWeekend,
  handleMonthChange,
  handleYearChange,
}) => {
  const daysInMonth = getDaysInMonth(displayYear, displayMonth);
  const firstDay = new Date(displayYear, displayMonth, 1).getDay();

  const getCalendarDays = useMemo(() => {
    const calendarDays = [];

    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(
        <div key={`empty-${i}`} className="calendar-day empty"></div>
      );
    }

    // Add clickable divs for each day in the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(displayYear, displayMonth, day);

      // Check if the current date is selected (start or end date)
      const isSelected =
        (startDate && date.toDateString() === startDate.toDateString()) ||
        (endDate && date.toDateString() === endDate.toDateString());

      // Check if the current date is within the selected range and not a weekend
      const isInRange =
        startDate &&
        endDate &&
        date > startDate &&
        date < endDate &&
        !isWeekend(date);

      calendarDays.push(
        <div
          key={day}
          className={`calendar-day ${isWeekend(date) ? "weekend" : ""} ${
            isSelected ? "selected" : ""
          } ${isInRange ? "in-range" : ""}`}
          onClick={() => handleDateClick(date)}
        >
          {day}
        </div>
      );
    }

    return calendarDays;
  }, [
    daysInMonth,
    displayMonth,
    displayYear,
    endDate,
    firstDay,
    handleDateClick,
    isWeekend,
    startDate,
  ]);

  return (
    <CalendarWrapper data-testid="calendar-component">
      <CalendarHeader
        displayMonth={displayMonth}
        displayYear={displayYear}
        handleMonthChange={handleMonthChange}
        handleYearChange={handleYearChange}
      />

      <CalendarWeekDays>
        {weekDays.map((day) => (
          <div key={day} className="calendar-weekday">
            {day}
          </div>
        ))}
      </CalendarWeekDays>

      <CalendarDays>{getCalendarDays}</CalendarDays>
    </CalendarWrapper>
  );
};

export default Calendar;
