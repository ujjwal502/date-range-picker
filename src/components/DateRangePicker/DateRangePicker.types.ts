export interface PredefinedRangeConfig {
  label: string;
  // Only one of daysAgo, monthsAgo, or yearsAgo should be used at a time
  daysAgo?: number;
  monthsAgo?: number;
  yearsAgo?: number;
}

export interface DateRangePickerProps {
  predefinedRanges?: PredefinedRangeConfig[];
  onChange: (selectedRange: [string, string], weekendDates: string[]) => void;
}

export interface DateRangePickerState {
  startDate: Date | null;
  endDate: Date | null;
  isOpen: boolean;
  selectedRange: string;
  startYear: number;
  startMonth: number;
  endYear: number;
  endMonth: number;
}

export type DateRangePickerAction =
  | { type: "SET_START_DATE"; payload: Date | null }
  | { type: "SET_END_DATE"; payload: Date | null }
  | { type: "SET_IS_OPEN"; payload: boolean }
  | { type: "SET_SELECTED_RANGE"; payload: string }
  | { type: "SET_START_YEAR"; payload: number }
  | { type: "SET_START_MONTH"; payload: number }
  | { type: "SET_END_YEAR"; payload: number }
  | { type: "SET_END_MONTH"; payload: number }
  | { type: "CLEAR_SELECTED_DATES" };
