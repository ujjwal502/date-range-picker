import {
  DateRangePickerState,
  DateRangePickerAction,
  PredefinedRangeConfig,
} from "./DateRangePicker.types";

import { Range } from "../CustomRanges/CustomRanges";

export const dateRangePickerReducer = (
  state: DateRangePickerState,
  action: DateRangePickerAction
): DateRangePickerState => {
  switch (action.type) {
    case "SET_START_DATE":
      return { ...state, startDate: action.payload };
    case "SET_END_DATE":
      return { ...state, endDate: action.payload };
    case "SET_IS_OPEN":
      return { ...state, isOpen: action.payload };
    case "SET_SELECTED_RANGE":
      return { ...state, selectedRange: action.payload };
    case "SET_START_YEAR":
      return { ...state, startYear: action.payload };
    case "SET_START_MONTH":
      return { ...state, startMonth: action.payload };
    case "SET_END_YEAR":
      return { ...state, endYear: action.payload };
    case "SET_END_MONTH":
      return { ...state, endMonth: action.payload };
    case "CLEAR_SELECTED_DATES":
      return {
        ...state,
        startDate: null,
        endDate: null,
        startYear: new Date().getFullYear(),
        startMonth: new Date().getMonth(),
        endYear: new Date().getFullYear(),
        endMonth: (new Date().getMonth() + 1) % 12,
      };
    default:
      return state;
  }
};

export const initialState: DateRangePickerState = {
  startDate: null,
  endDate: null,
  isOpen: false,
  selectedRange: "",
  startYear: new Date().getFullYear(),
  startMonth: new Date().getMonth(),
  endYear: new Date().getFullYear(),
  endMonth: (new Date().getMonth() + 1) % 12,
};

export const generatePredefinedRanges = (
  config: PredefinedRangeConfig[]
): Range[] => {
  const today = new Date();

  return config.map(({ label, daysAgo, monthsAgo, yearsAgo }) => {
    const startDate = new Date(today);

    if (daysAgo) {
      startDate.setDate(startDate.getDate() - daysAgo);
    } else if (monthsAgo) {
      startDate.setMonth(startDate.getMonth() - monthsAgo);
    } else if (yearsAgo) {
      startDate.setFullYear(startDate.getFullYear() - yearsAgo);
    }

    return {
      label,
      startDate,
      endDate: today,
    };
  });
};