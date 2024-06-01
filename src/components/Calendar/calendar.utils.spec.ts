import { getDaysInMonth, isWeekend, weekDays } from "./calendar.utils";

describe("calendar.utils", () => {
  describe("getDaysInMonth", () => {
    it("returns the correct number of days for a given month and year", () => {
      expect(getDaysInMonth(2023, 0)).toBe(31); // January 2023
      expect(getDaysInMonth(2023, 1)).toBe(28); // February 2023
      expect(getDaysInMonth(2024, 1)).toBe(29); // February 2024 (leap year)
      expect(getDaysInMonth(2023, 3)).toBe(30); // April 2023
      expect(getDaysInMonth(2023, 11)).toBe(31); // December 2023
    });
  });

  describe("isWeekend", () => {
    it("returns true for Saturday and Sunday", () => {
      const saturday = new Date("2023-06-10");
      const sunday = new Date("2023-06-11");
      expect(isWeekend(saturday)).toBe(true);
      expect(isWeekend(sunday)).toBe(true);
    });

    it("returns false for weekdays", () => {
      const monday = new Date("2023-06-12");
      const wednesday = new Date("2023-06-14");
      const friday = new Date("2023-06-16");
      expect(isWeekend(monday)).toBe(false);
      expect(isWeekend(wednesday)).toBe(false);
      expect(isWeekend(friday)).toBe(false);
    });
  });

  describe("weekDays", () => {
    it("contains the correct weekday names in the correct order", () => {
      expect(weekDays).toEqual([
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
      ]);
    });
  });
});
