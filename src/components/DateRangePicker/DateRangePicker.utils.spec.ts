import {
  dateRangePickerReducer,
  formatDate,
  initialState,
} from "./DateRangePicker.utils";
import {
  DateRangePickerState,
  DateRangePickerAction,
} from "./DateRangePicker.types";

describe("DateRangePicker utils", () => {
  describe("dateRangePickerReducer", () => {
    it("should return the initial state when no action is provided", () => {
      const state = dateRangePickerReducer(
        initialState,
        {} as DateRangePickerAction
      );
      expect(state).toEqual(initialState);
    });

    it("should handle SET_START_DATE action correctly", () => {
      const startDate = new Date("2023-06-10");
      const action: DateRangePickerAction = {
        type: "SET_START_DATE",
        payload: startDate,
      };
      const state = dateRangePickerReducer(initialState, action);
      expect(state.startDate).toEqual(startDate);
    });

    it("should handle SET_END_DATE action correctly", () => {
      const endDate = new Date("2023-06-20");
      const action: DateRangePickerAction = {
        type: "SET_END_DATE",
        payload: endDate,
      };
      const state = dateRangePickerReducer(initialState, action);
      expect(state.endDate).toEqual(endDate);
    });

    it("should handle SET_IS_OPEN action correctly", () => {
      const isOpen = true;
      const action: DateRangePickerAction = {
        type: "SET_IS_OPEN",
        payload: isOpen,
      };
      const state = dateRangePickerReducer(initialState, action);
      expect(state.isOpen).toBe(isOpen);
    });

    it("should handle SET_SELECTED_RANGE action correctly", () => {
      const selectedRange = "2023-06-10 ~ 2023-06-20";
      const action: DateRangePickerAction = {
        type: "SET_SELECTED_RANGE",
        payload: selectedRange,
      };
      const state = dateRangePickerReducer(initialState, action);
      expect(state.selectedRange).toBe(selectedRange);
    });

    it("should handle SET_START_YEAR action correctly", () => {
      const startYear = 2022;
      const action: DateRangePickerAction = {
        type: "SET_START_YEAR",
        payload: startYear,
      };
      const state = dateRangePickerReducer(initialState, action);
      expect(state.startYear).toBe(startYear);
    });

    it("should handle SET_START_MONTH action correctly", () => {
      const startMonth = 5;
      const action: DateRangePickerAction = {
        type: "SET_START_MONTH",
        payload: startMonth,
      };
      const state = dateRangePickerReducer(initialState, action);
      expect(state.startMonth).toBe(startMonth);
    });

    it("should handle SET_END_YEAR action correctly", () => {
      const endYear = 2024;
      const action: DateRangePickerAction = {
        type: "SET_END_YEAR",
        payload: endYear,
      };
      const state = dateRangePickerReducer(initialState, action);
      expect(state.endYear).toBe(endYear);
    });

    it("should handle SET_END_MONTH action correctly", () => {
      const endMonth = 11;
      const action: DateRangePickerAction = {
        type: "SET_END_MONTH",
        payload: endMonth,
      };
      const state = dateRangePickerReducer(initialState, action);
      expect(state.endMonth).toBe(endMonth);
    });

    it("should handle CLEAR_SELECTED_DATES action correctly", () => {
      const currentDate = new Date();
      const expectedState: DateRangePickerState = {
        ...initialState,
        startYear: currentDate.getFullYear(),
        startMonth: currentDate.getMonth(),
        endYear: currentDate.getFullYear(),
        endMonth: (currentDate.getMonth() + 1) % 12,
      };
      const action: DateRangePickerAction = { type: "CLEAR_SELECTED_DATES" };
      const state = dateRangePickerReducer(initialState, action);
      expect(state).toEqual(expectedState);
    });
  });

  describe("initialState", () => {
    it("should have the correct initial values", () => {
      const currentDate = new Date();
      const expectedInitialState: DateRangePickerState = {
        startDate: null,
        endDate: null,
        isOpen: false,
        selectedRange: "",
        startYear: currentDate.getFullYear(),
        startMonth: currentDate.getMonth(),
        endYear: currentDate.getFullYear(),
        endMonth: (currentDate.getMonth() + 1) % 12,
      };
      expect(initialState).toEqual(expectedInitialState);
    });
  });

  describe("formatDate", () => {
    test("should return the correct date format for a valid date", () => {
      const date = new Date("2022-12-01T00:00:00.000Z");
      const formattedDate = formatDate(date);
      expect(formattedDate).toBe("2022-12-01");
    });

    test("should handle single-digit months and days correctly", () => {
      const date = new Date("2022-02-03T00:00:00.000Z");
      const formattedDate = formatDate(date);
      expect(formattedDate).toBe("2022-02-03");
    });

    test("should handle leap years correctly", () => {
      const date = new Date("2024-02-29T00:00:00.000Z");
      const formattedDate = formatDate(date);
      expect(formattedDate).toBe("2024-02-29");
    });

    test("should handle invalid dates gracefully", () => {
      const invalidDate = new Date("invalid");
      const formattedDate = formatDate(invalidDate);
      expect(formattedDate).toBe("NaN-NaN-NaN");
    });
  });
});
