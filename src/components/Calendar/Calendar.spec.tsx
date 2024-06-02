import { render, screen, fireEvent } from "@testing-library/react";
import Calendar from "./Calendar";

describe("Calendar", () => {
  const handleDateClick = jest.fn();
  const handleMonthChange = jest.fn();
  const handleYearChange = jest.fn();
  const isWeekend = jest.fn(
    (date) => date.getDay() === 0 || date.getDay() === 6
  );

  const displayYear = 2023;
  const displayMonth = 5;
  const startDate = new Date(2023, 5, 10);
  const endDate = new Date(2023, 5, 20);

  beforeEach(() => {
    render(
      <Calendar
        displayYear={displayYear}
        displayMonth={displayMonth}
        startDate={startDate}
        endDate={endDate}
        handleDateClick={handleDateClick}
        isWeekend={isWeekend}
        handleMonthChange={handleMonthChange}
        handleYearChange={handleYearChange}
        today={new Date()}
      />
    );
  });

  it("renders the calendar header with the correct month and year", () => {
    const monthSelect = screen.getByDisplayValue("June");
    const yearSelect = screen.getByDisplayValue(displayYear.toString());
    expect(monthSelect).toBeInTheDocument();
    expect(yearSelect).toBeInTheDocument();
  });

  it("renders the weekdays correctly", () => {
    const weekdays = screen.getAllByText(/Sun|Mon|Tue|Wed|Thu|Fri|Sat/i);
    expect(weekdays.length).toBe(7);
  });

  it("calls handleDateClick when a date is clicked", () => {
    const calendarDay = screen.getByText("15");
    fireEvent.click(calendarDay);
    expect(handleDateClick).toHaveBeenCalledWith(new Date(2023, 5, 15));
  });

  it("calls handleMonthChange when the month is changed", () => {
    const monthSelect = screen.getByDisplayValue("June");
    fireEvent.change(monthSelect, { target: { value: "6" } });
    expect(handleMonthChange).toHaveBeenCalledWith(6);
  });

  it("calls handleYearChange when the year is changed", () => {
    const yearSelect = screen.getByDisplayValue(displayYear.toString());
    fireEvent.change(yearSelect, { target: { value: "2024" } });
    expect(handleYearChange).toHaveBeenCalledWith(2024);
  });
});
