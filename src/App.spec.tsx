import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  beforeEach(() => {
    render(<App />);
  });

  it("renders the heading", () => {
    const heading = screen.getByRole("heading", {
      name: "Date Range Picker Example",
    });
    expect(heading).toBeInTheDocument();
  });

  it("renders the DateRangePicker component", () => {
    const dateRangePicker = screen.getByPlaceholderText(
      "Please click me to select the date!"
    );
    expect(dateRangePicker).toBeInTheDocument();
  });

  it("renders the predefined ranges in the modal", () => {
    const inputField = screen.getByPlaceholderText(
      "Please click me to select the date!"
    );
    fireEvent.click(inputField);
    const lastSevenDaysRange = screen.getByText("Last 7 Days");
    const lastThirtyDaysRange = screen.getByText("Last 30 Days");
    expect(lastSevenDaysRange).toBeInTheDocument();
    expect(lastThirtyDaysRange).toBeInTheDocument();
  });
});
