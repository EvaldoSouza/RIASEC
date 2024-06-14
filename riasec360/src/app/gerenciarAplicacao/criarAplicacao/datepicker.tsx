// components/DatePickerComponent.tsx
"use client";
import React, { useState } from "react";
import DatePicker, { DatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@/components/ui/button";

const DatePickerComponent: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleStartDateChange: DatePickerProps["onChange"] = (
    date: Date | null
  ) => {
    setStartDate(date as Date);
  };

  const handleEndDateChange: DatePickerProps["onChange"] = (
    date: Date | null
  ) => {
    setEndDate(date as Date);
  };

  const handleSave = () => {
    if (startDate && endDate) {
      console.log("Start Date:", startDate);
      console.log("End Date:", endDate);
      // Here you can add your logic to save the dates to a database or state management store
    } else {
      console.log("Start or end date not selected");
    }
  };

  const isPastDate = (date: Date) => {
    return date < new Date();
  };

  const isEndDateValid = (date: Date) => {
    return startDate ? date > startDate : true;
  };

  return (
    <div>
      <div>
        <label htmlFor="start-date">
          Choose the start date and time for the test:
        </label>
        <DatePicker
          id="start-date"
          selected={startDate}
          onChange={handleStartDateChange}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="MMMM d, yyyy h:mm aa"
          minDate={new Date()}
          filterTime={(time) => !isPastDate(time)}
          placeholderText="Select start date and time"
        />
      </div>
      <div>
        <label htmlFor="end-date">
          Choose the end date and time for the test:
        </label>
        <DatePicker
          id="end-date"
          selected={endDate}
          onChange={handleEndDateChange}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="MMMM d, yyyy h:mm aa"
          minDate={new Date()}
          filterTime={(time) => !isPastDate(time)}
          filterDate={isEndDateValid}
          placeholderText="Select end date and time"
        />
      </div>
      <Button onClick={handleSave}>Registrar Datas</Button>
    </div>
  );
};

export default DatePickerComponent;
