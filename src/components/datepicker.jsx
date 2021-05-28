import React, { useState } from "react";
import { KeyboardDatePicker } from "@material-ui/pickers";

const DatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  return (
    <KeyboardDatePicker
      disableToolbar
      variant="inline"
      format="DD/mm/yyyy"
      margin="normal"
      id="date-picker-inline"
      label="Date picker inline"
      value={selectedDate}
      onChange={handleDateChange}
      KeyboardButtonProps={{
        "aria-label": "change date",
      }}
    />
  );
};

export default DatePicker;
