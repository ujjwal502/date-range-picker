import { render, screen, fireEvent } from "@testing-library/react";
import CalendarHeader from "./CalendarHeader";

describe("CalendarHeader", () => {
  const handleMonthChange = jest.fn();
  const handleYearChange = jest.fn();
  const displayYear = 2023;
  const displayMonth = 5;

  beforeEach(() => {
    render(
      <CalendarHeader
        handleMonthChange={handleMonthChange}
        handleYearChange={handleYearChange}
        displayYear={displayYear}
        displayMonth={displayMonth}
      />
    );
  });

  it("renders the year select with the correct value", () => {
    const yearSelect = screen.getByDisplayValue(displayYear.toString());
    expect(yearSelect).toBeInTheDocument();
  });

  it("renders the month select with the correct value", () => {
    const monthSelect = screen.getByDisplayValue("June");
    expect(monthSelect).toBeInTheDocument();
  });

  it("calls handleMonthChange when month is changed", () => {
    const monthSelect = screen.getByDisplayValue("June");
    fireEvent.change(monthSelect, { target: { value: "6" } });
    expect(handleMonthChange).toHaveBeenCalledWith(6);
  });

  it("calls handleYearChange when year is changed", () => {
    const yearSelect = screen.getByDisplayValue(displayYear.toString());
    fireEvent.change(yearSelect, { target: { value: "2024" } });
    expect(handleYearChange).toHaveBeenCalledWith(2024);
  });

  it("renders the correct number of month options", () => {
    const monthOptions = screen.getAllByRole("option");
    //  there are 100 year options + 12 month options
    expect(monthOptions.length).toBe(112);
  });
});
