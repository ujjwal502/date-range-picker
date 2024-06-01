import styled from "styled-components";

export const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

export const CalendarWeekDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  margin-bottom: 5px;
  .calendar-weekday {
    text-align: center;
    font-weight: bold;
  }
`;

export const CalendarDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  .calendar-day {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 33px;
    height: 40px;
    border: 1px solid #ccc;
    cursor: pointer;
  }

  .calendar-day.weekend {
    background-color: #f0f0f0;
    cursor: not-allowed;
  }

  .calendar-day.selected {
    background-color: #007bff;
    color: #fff;
  }

  .calendar-day.in-range {
    background-color: #007bff69;
  }

  .calendar-day.empty {
    border: none;
    cursor: default;
  }
`;
