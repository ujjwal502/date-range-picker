import {
  DateRangePickerState,
  DateRangePickerAction,
  PredefinedRangeConfig,
} from "./DateRangePicker.types";

import { Range } from "../CustomRanges/CustomRanges";
import { isWeekend } from "../Calendar/calendar.utils";

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
  // Setting the time of today to midnight to ensure a consistent end date
  today.setHours(0, 0, 0, 0);

  return config.map(({ label, daysAgo, monthsAgo, yearsAgo }) => {
    const startDate = new Date(today);

    if (daysAgo) {
      startDate.setDate(startDate.getDate() - daysAgo);
    } else if (monthsAgo) {
      startDate.setMonth(startDate.getMonth() - monthsAgo);
    } else if (yearsAgo) {
      startDate.setFullYear(startDate.getFullYear() - yearsAgo);
    }

    // Adjusting start date to the nearest previous weekday if it falls on a weekend
    while (isWeekend(startDate)) {
      startDate.setDate(startDate.getDate() - 1);
    }

    const endDate = new Date(today);

    // Adjusting end date to the nearest previous weekday if it falls on a weekend
    while (isWeekend(endDate)) {
      endDate.setDate(endDate.getDate() - 1);
    }

    return {
      label,
      startDate,
      endDate,
    };
  });
};

export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
};
