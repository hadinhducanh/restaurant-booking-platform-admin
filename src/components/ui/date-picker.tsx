// src/components/ui/date-picker.tsx

import React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "./button"; // Đây là import tạm thời, thay vào đó là đường dẫn thực tế của Button component

interface DatePickerProps {
  name: string;
  selected: Date | null;
  onChange: (date: Date | null) => void;
  placeholderText?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  // name,
  selected,
  // onChange,
  placeholderText = "Pick a date",
}) => {
  // const handleDateChange = (date: Date | null) => {
  //   onChange(date);
  // };

  return (
    <div>
      <Button
        variant={"outline"}
        className="w-[280px] justify-start text-left font-normal"
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {selected ? format(selected, "PPP") : <span>{placeholderText}</span>}
      </Button>
    </div>
  );
};
