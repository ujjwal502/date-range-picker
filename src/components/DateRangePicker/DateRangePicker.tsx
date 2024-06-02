import React, { useCallback, useEffect, useReducer, useRef } from "react";
import Calendar from "../Calendar/Calendar";
import CustomRanges from "../CustomRanges/CustomRanges";
import { isWeekend } from "../Calendar/calendar.utils";
import {
  CalendarContainer,
  CalendarFooterButtonWrapper,
  DateRangePickerWrapper,
  InputField,
  InputIcon,
  InputWrapper,
  ModalContent,
  ModalOverlay,
  VerticalDivider,
} from "./DateRangePicker.styles";
import { DateRangePickerProps } from "./DateRangePicker.types";
import {
  dateRangePickerReducer,
  formatDate,
  initialState,
} from "./DateRangePicker.utils";

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  predefinedRanges = [],
  onChange,
}) => {
  const [state, dispatch] = useReducer(dateRangePickerReducer, initialState);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    updateSelectedRange();
  }, [state.startDate, state.endDate]);

  useEffect(() => {
    handleOutsideClickListener();
    return () => {
      removeOutsideClickListener();
    };
  }, [state.isOpen]);

  const handleStartMonthChange = (month: number) => {
    dispatch({ type: "SET_START_MONTH", payload: month });
  };

  const handleStartYearChange = (year: number) => {
    dispatch({ type: "SET_START_YEAR", payload: year });
  };

  const handleEndMonthChange = (month: number) => {
    dispatch({ type: "SET_END_MONTH", payload: month });
    updateStartMonthIfNeeded(month);
  };

  const handleEndYearChange = (year: number) => {
    dispatch({ type: "SET_END_YEAR", payload: year });
    updateStartYearAndMonthIfNeeded(year);
  };

  const closeModal = useCallback(() => {
    return dispatch({ type: "SET_IS_OPEN", payload: false });
  }, []);

  const handleApplyClick = () => {
    getSelectedRange();
    closeModal();
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      closeModal();
    }
  };

  const handleDateClick = (date: Date) => {
    if (isWeekend(date)) {
      return;
    }
    updateSelectedDates(date);
  };

  const handlePredefinedRangeClick = (startDate: Date, endDate: Date) => {
    dispatch({ type: "SET_START_DATE", payload: startDate });
    dispatch({ type: "SET_END_DATE", payload: endDate });
  };

  const handleClearClick = useCallback(() => {
    dispatch({ type: "CLEAR_SELECTED_DATES" });
  }, []);

  const updateSelectedRange = () => {
    if (state.startDate && state.endDate) {
      const startDateString = formatDate(state.startDate);
      const endDateString = formatDate(state.endDate);

      dispatch({
        type: "SET_SELECTED_RANGE",
        payload: `${startDateString} ~ ${endDateString}`,
      });
    } else {
      dispatch({ type: "SET_SELECTED_RANGE", payload: "" });
    }
  };

  const handleOutsideClickListener = () => {
    if (state.isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      removeOutsideClickListener();
    }
  };

  const removeOutsideClickListener = () => {
    document.removeEventListener("mousedown", handleOutsideClick);
  };

  const updateStartMonthIfNeeded = (month: number) => {
    if (state.endYear === state.startYear && month < state.startMonth) {
      dispatch({ type: "SET_START_MONTH", payload: (month - 1 + 12) % 12 });
    }
  };

  const updateStartYearAndMonthIfNeeded = (year: number) => {
    if (
      year < state.startYear ||
      (year === state.startYear && state.endMonth < state.startMonth)
    ) {
      dispatch({ type: "SET_START_YEAR", payload: year });
      dispatch({
        type: "SET_START_MONTH",
        payload: (state.endMonth - 1 + 12) % 12,
      });
    }
  };

  const updateSelectedDates = (date: Date) => {
    if (!state.startDate || (state.startDate && state.endDate)) {
      dispatch({ type: "SET_START_DATE", payload: date });
      dispatch({ type: "SET_END_DATE", payload: null });
    } else if (date < state.startDate) {
      dispatch({ type: "SET_END_DATE", payload: state.startDate });
      dispatch({ type: "SET_START_DATE", payload: date });
    } else {
      dispatch({ type: "SET_END_DATE", payload: date });
    }
  };

  const getSelectedRange = () => {
    if (state.startDate && state.endDate) {
      const selectedRange: [string, string] = [
        formatDate(state.startDate),
        formatDate(state.endDate),
      ];
      const weekendDates: string[] = getWeekendDates(
        state.startDate,
        state.endDate
      );
      onChange(selectedRange, weekendDates);
    }
  };

  const getWeekendDates = (startDate: Date, endDate: Date) => {
    const weekendDates: string[] = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      if (isWeekend(currentDate)) {
        weekendDates.push(formatDate(currentDate));
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return weekendDates;
  };

  const buttonConfig = [
    {
      className: "button-apply",
      handler: handleApplyClick,
      text: "Apply",
      id: 1,
    },
    {
      className: "button-clear",
      handler: handleClearClick,
      text: "Clear",
      id: 2,
    },
  ];

  return (
    <DateRangePickerWrapper>
      <InputWrapper
        onClick={() => dispatch({ type: "SET_IS_OPEN", payload: true })}
      >
        <InputField
          readOnly
          placeholder="Please click me to select the date!"
          value={state.selectedRange}
        />
        <InputIcon>📅</InputIcon>
      </InputWrapper>
      {state.isOpen && (
        <ModalOverlay data-testid="calendar-modal">
          <ModalContent ref={modalRef}>
            <div onClick={closeModal} className="modal-close">
              ❌
            </div>
            <CalendarContainer>
              <Calendar
                displayMonth={state.startMonth}
                displayYear={state.startYear}
                endDate={state.endDate!}
                handleDateClick={handleDateClick}
                handleMonthChange={handleStartMonthChange}
                startDate={state.startDate!}
                isWeekend={isWeekend}
                handleYearChange={handleStartYearChange}
              />
              <VerticalDivider />
              <Calendar
                displayMonth={state.endMonth}
                displayYear={state.endYear}
                endDate={state.endDate!}
                handleDateClick={handleDateClick}
                handleMonthChange={handleEndMonthChange}
                startDate={state.startDate!}
                isWeekend={isWeekend}
                handleYearChange={handleEndYearChange}
              />
            </CalendarContainer>
            <CustomRanges
              handlePredefinedRangeClick={handlePredefinedRangeClick}
              predefinedRanges={predefinedRanges}
            />
            <CalendarFooterButtonWrapper>
              {buttonConfig.map((config) => (
                <button
                  key={config.id}
                  className={config.className}
                  onClick={config.handler}
                >
                  {config.text}
                </button>
              ))}
            </CalendarFooterButtonWrapper>
          </ModalContent>
        </ModalOverlay>
      )}
    </DateRangePickerWrapper>
  );
};

export default DateRangePicker;
