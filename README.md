# Date Range Picker

This component provides a user interface for selecting a date range. It allows users to choose specific dates or utilize predefined range options.

**Features:**

- **Customizable:** Accepts predefined ranges as configuration options.
- **Interactive:** Users can select a date range through the UI.
- **Event Handling:** Provides a callback function to capture the selected range and weekend dates (optional).

**Props:**
| | Prop | Type | Description |
|----------------|----------------|----------------------|----------------|
| | predefinedRanges| Array<PredefinedRange> | An array of predefined date ranges for quick selection |
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
import DateRangePicker from "./components/DateRangePicker/DateRangePicker";
```

2. **Utilization:** Use this component like below :-.

```jsx
const predefinedRanges = [
  {
    label: "Last 7 Days",
    startDate: new Date(new Date().setDate(new Date().getDate() - 7)),
    endDate: new Date(),
  },
  {
    label: "Last 30 Days",
    startDate: new Date(new Date().setDate(new Date().getDate() - 30)),
    endDate: new Date(),
  },
];

const handleDateRangeChange = (selectedRange, weekendDates) => {
  console.log("Selected Range:", selectedRange);
  console.log("Weekend Dates:", weekendDates);
};

return (
  <DateRangePicker
    predefinedRanges={predefinedRanges}
    onChange={handleDateRangeChange}
  />
);

export default App;
```

<!-- ## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list -->
