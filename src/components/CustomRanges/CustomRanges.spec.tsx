import { render, screen, fireEvent } from "@testing-library/react";

import CustomRanges from "./CustomRanges";

describe("CustomRanges", () => {
  const handlePredefinedRangeClick = jest.fn();

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
    {
      label: "Custom Range",
      startDate: new Date(2023, 5, 10),
      endDate: new Date(2023, 5, 20),
    },
  ];

  beforeEach(() => {
    render(
      <CustomRanges
        predefinedRanges={predefinedRanges}
        handlePredefinedRangeClick={handlePredefinedRangeClick}
      />
    );
  });

  it("renders the labels of predefined ranges correctly", () => {
    predefinedRanges.forEach(({ label }) => {
      const predefinedRangeElement = screen.getByText(label);
      expect(predefinedRangeElement).toBeInTheDocument();
    });
  });

  it("calls handlePredefinedRangeClick with the correct dates when a predefined range is clicked", () => {
    predefinedRanges.forEach(({ label, startDate, endDate }) => {
      const predefinedRangeElement = screen.getByText(label);
      fireEvent.click(predefinedRangeElement);
      expect(handlePredefinedRangeClick).toHaveBeenCalledWith(
        startDate,
        endDate
      );
    });
  });
});
