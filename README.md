# Date Range Picker

This component provides a user interface for selecting a date range. It allows users to choose specific dates or utilize predefined range options.

**Features:**

- **Customizable:** Accepts predefined ranges as configuration options.
- **Interactive:** Users can select a date range through the UI.
- **Event Handling:** Provides a callback function to capture the selected range and weekend dates (optional).

**Props:**
| | Prop | Type | Description |
|----------------|----------------|----------------------|----------------|
| | predefinedRanges| Array<[PredefinedRange](./src/components/DateRangePicker/DateRangePicker.types.ts)> | An array of predefined date ranges for quick selection |
| | onChange | (selectedRange: [string, string], weekendDates: string[]) => void | Callback function to handle the selected date range and weekend dates |

## Dev setup

To have the correct node version

```bash
nvm use
```

To install the dependencies

```bash
npm i
```

To run the app

```bash
npm run dev
```

To run the tests

```bash
npm run test
```

## Usage

1. **Import:** Import the component in your React application.

```javascript
import DateRangePicker from "<YOUR-PATH>/DateRangePicker";
```

2. **Utilization:** Use this component like below :-.

```jsx
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
  <DateRangePicker
    predefinedRanges={predefinedRangesConfig}
    onChange={handleDateRangeChange}
  />
);
```
