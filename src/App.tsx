import React from "react";
import DateRangePicker from "./components/DateRangePicker/DateRangePicker";

const App: React.FC = () => {
  const handleDateRangeChange = (
    selectedRange: [string, string],
    weekendDates: string[]
  ) => {
    console.log("Selected Range:", selectedRange);
    console.log("Weekend Dates:", weekendDates);
  };

  const predefinedRangesConfig = [
    { label: "Today", daysAgo: 0 },
    { label: "Last 7 Days", daysAgo: 7 },
    { label: "Last 30 Days", daysAgo: 30 },
    { label: "Last 6 Months", monthsAgo: 6 },
    { label: "Last 1 Year", yearsAgo: 1 },
  ];

  return (
    <div>
      <h2 className="date-range-picker-header">
        Here is an example of Date Range Picker
      </h2>

      <DateRangePicker
        predefinedRanges={predefinedRangesConfig}
        onChange={handleDateRangeChange}
      />
    </div>
  );
};

export default App;
