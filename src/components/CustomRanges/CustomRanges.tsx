import { FC } from "react";
import { CustomRangesWrapper } from "./CustomRanges.styles";

export interface Range {
  label: string;
  startDate: Date;
  endDate: Date;
}

interface CustomRangesPropsModel {
  predefinedRanges: Range[];
  handlePredefinedRangeClick: (startDate: Date, endDate: Date) => void;
}

const CustomRanges: FC<CustomRangesPropsModel> = ({
  predefinedRanges,
  handlePredefinedRangeClick,
}) => {
  return (
    <CustomRangesWrapper>
      {predefinedRanges.map(({ label, startDate, endDate }) => (
        <div
          key={label}
          onClick={() => handlePredefinedRangeClick(startDate, endDate)}
        >
          {label}
        </div>
      ))}
    </CustomRangesWrapper>
  );
};

export default CustomRanges;
