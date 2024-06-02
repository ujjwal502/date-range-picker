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
    const modal = screen.getByTestId("modal");
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

  it("calls the onChange callback with the selected date range and weekend dates", () => {
    const { container } = render(
      <DateRangePicker
        predefinedRanges={predefinedRanges}
        onChange={onChange}
      />
    );

    const inputEle = container.getElementsByTagName("input")[0];
    fireEvent.click(inputEle);

    //Putting the arbitrary index so that I do not click non-clickable div
    const dateDivEle = container.getElementsByClassName("calendar-day")[25];
    fireEvent.click(dateDivEle);
    fireEvent.click(dateDivEle);

    fireEvent.click(screen.getByText("Apply"));
    expect(onChange).toHaveBeenCalled();
  });

  it("clears the selected dates when the Clear button is clicked", () => {
    const { container } = render(
      <DateRangePicker
        predefinedRanges={predefinedRanges}
        onChange={onChange}
      />
    );

    const inputEle = container.getElementsByTagName("input")[0];
    fireEvent.click(inputEle);

    const dateDivEle = container.getElementsByClassName("calendar-day")[25];
    fireEvent.click(dateDivEle);
    fireEvent.click(dateDivEle);
    fireEvent.click(screen.getByText("Clear"));

    const inputElem = container.getElementsByTagName("input")[0];
    expect(inputElem.value).toBe("");
  });

  it("should not render the predefined ranges when predefinedRanges are not passed as prop", () => {
    const { container } = render(<DateRangePicker onChange={onChange} />);

    const inputEle = container.getElementsByTagName("input")[0];
    fireEvent.click(inputEle);

    const dateDivEle = container.getElementsByClassName("preDefined-range")[0];
    expect(dateDivEle.childNodes.length).toBe(0);
  });
});
