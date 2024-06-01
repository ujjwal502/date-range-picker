export interface CalenderPropsModel {
  displayYear: number;
  displayMonth: number;
  startDate: Date;
  endDate: Date;
  isWeekend: (date: Date) => boolean;
  handleDateClick: (date: Date) => void;
  handleYearChange: (year: number) => void;
  handleMonthChange: (month: number) => void;
}
