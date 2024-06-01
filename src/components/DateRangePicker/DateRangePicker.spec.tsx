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

  //   it("calls onChange with the selected range and weekend dates when the 'Apply' button is clicked", () => {
  //     const inputField = screen.getByPlaceholderText(
  //       "Please click me to select the date!"
  //     );
  //     fireEvent.click(inputField);
  //     // const startDate = new Date(2023, 5, 10);
  //     // const endDate = new Date(2023, 5, 20);
  //     const startDateElement = screen.getByText("10");
  //     const endDateElement = screen.getByText("20");
  //     fireEvent.click(startDateElement);
  //     fireEvent.click(endDateElement);
  //     const applyButton = screen.getByText("Apply");
  //     fireEvent.click(applyButton);
  //     expect(onChange).toHaveBeenCalledWith(
  //       ["2023-06-10", "2023-06-20"],
  //       ["2023-06-10", "2023-06-11", "2023-06-17", "2023-06-18"]
  //     );
  //   });

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

  //   it("clears the selected dates when the 'Clear' button is clicked", () => {
  //     const inputField = screen.getByPlaceholderText(
  //       "Please click me to select the date!"
  //     );
  //     fireEvent.click(inputField);

  //     const startDateElement = screen.getByText("2");
  //     const endDateElement = screen.getByText("3");
  //     fireEvent.click(startDateElement);
  //     fireEvent.click(endDateElement);
  //     const clearButton = screen.getByText("Clear");
  //     fireEvent.click(clearButton);
  //     expect(screen.queryByText("10")).not.toBeInTheDocument();
  //     expect(screen.queryByText("20")).not.toBeInTheDocument();
  //   });
});
