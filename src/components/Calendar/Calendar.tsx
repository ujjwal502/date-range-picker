import { FC, useCallback, useMemo } from "react";
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
  today,
}) => {
  const daysInMonth = getDaysInMonth(displayYear, displayMonth);
  const firstDay = new Date(displayYear, displayMonth, 1).getDay();

  const isDateSelected = useCallback(
    (date: Date) =>
      (startDate && date.toDateString() === startDate.toDateString()) ||
      (endDate && date.toDateString() === endDate.toDateString()),
    [endDate, startDate]
  );

  const isDateInRange = useCallback(
    (date: Date) =>
      startDate &&
      endDate &&
      date > startDate &&
      date < endDate &&
      !isWeekend(date),
    [endDate, isWeekend, startDate]
  );

  const renderCalendarDay = useCallback(
    (day: number) => {
      const date = new Date(displayYear, displayMonth, day);
      const isSelected = isDateSelected(date);
      const isInRange = isDateInRange(date);
      const isToday = date.toDateString() === today.toDateString();

      return (
        <div
          key={day}
          className={`calendar-day ${isWeekend(date) ? "weekend" : ""} ${
            isSelected ? "selected" : ""
          } ${isInRange ? "in-range" : ""} ${isToday ? "today" : ""}`}
          onClick={() => handleDateClick(date)}
        >
          {day}
        </div>
      );
    },
    [
      displayMonth,
      displayYear,
      handleDateClick,
      isDateInRange,
      isDateSelected,
      isWeekend,
      today,
    ]
  );

  const renderCalendarDays = useMemo(() => {
    const calendarDays = [];

    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(
        <div key={`empty-${i}`} className="calendar-day empty"></div>
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push(renderCalendarDay(day));
    }

    return calendarDays;
  }, [daysInMonth, firstDay, renderCalendarDay]);

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

      <CalendarDays>{renderCalendarDays}</CalendarDays>
    </CalendarWrapper>
  );
};

export default Calendar;
