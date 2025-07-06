import { DateRange } from "react-date-range";
import { ko } from "date-fns/locale";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { TripDateRange } from "@/app/types/trip";

type Props = {
  value: TripDateRange;
  onChange: (range: TripDateRange) => void;
};

export default function TripDateRangePicker({ value, onChange }: Props) {
  const handleOnChange = (ranges: { selection: TripDateRange }) => {
    const { selection } = ranges;

    onChange({
      ...selection,
      key: "selection",
    });
  };

  return (
    <DateRange
      editableDateInputs
      onChange={handleOnChange}
      moveRangeOnFirstSelection={false}
      showSelectionPreview
      months={1}
      ranges={[value]}
      locale={ko}
      direction="vertical"
    />
  );
}
