import { render, screen, fireEvent } from "@testing-library/react";
import DateRangePicker from "./DateRangePicker";

describe("DateRangePicker", () => {
  const onChange = jest.fn();
  const predefinedRanges = [
    {
      label: "Last 7 Days",
      startDate: new Date(2023, 5, 1),
      endDate: new Date(2023, 5, 7),
    },
    {
      label: "Last 30 Days",
      startDate: new Date(2023, 4, 15),
      endDate: new Date(2023, 5, 14),
    },
  ];

  beforeEach(() => {
    render(
      <DateRangePicker
        predefinedRanges={predefinedRanges}
        onChange={onChange}
      />
    );
  });

  it("renders the input field with the correct placeholder", () => {
    const inputField = screen.getByPlaceholderText(
      "Please click me to select the date!"
    );
    expect(inputField).toBeInTheDocument();
  });

  it("opens the modal when the input field is clicked", () => {
    const inputField = screen.getByPlaceholderText(
      "Please click me to select the date!"
    );
    fireEvent.click(inputField);
    const modal = screen.getByTestId("calendar-modal");
    expect(modal).toBeInTheDocument();
  });

  it("renders two calendar components in the modal", () => {
    const inputField = screen.getByPlaceholderText(
      "Please click me to select the date!"
    );
    fireEvent.click(inputField);
    const calendarComponents = screen.getAllByTestId("calendar-component");
    expect(calendarComponents.length).toBe(2);
  });

  it("renders the predefined ranges in the modal", () => {
    const inputField = screen.getByPlaceholderText(
      "Please click me to select the date!"
    );
    fireEvent.click(inputField);
    predefinedRanges.forEach(({ label }) => {
      const predefinedRangeElement = screen.getByText(label);
      expect(predefinedRangeElement).toBeInTheDocument();
    });
  });

  it("closes the modal when the close button is clicked", () => {
    const inputField = screen.getByPlaceholderText(
      "Please click me to select the date!"
    );
    fireEvent.click(inputField);
    const closeButton = screen.getByText("❌");
    fireEvent.click(closeButton);
    const modal = screen.queryByTestId("calendar-modal");
    expect(modal).not.toBeInTheDocument();
  });
});
