"use client";
import React, { useState } from "react";
import DatePicker, { DatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@/components/ui/button";

interface DatePickerInterface {
  callBackData: any;
}

const DatePickerComponent = ({ callBackData }: DatePickerInterface) => {
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
    callBackData({ startDate, endDate });
  };

  const isPastDate = (date: Date) => {
    return date < new Date();
  };

  //e essa daqui?
  //Deveria checar se a data é valida, ou seja, maior que a data inicial
  const isEndDateValid = (date: Date) => {
    if (startDate) {
      if (date > startDate) {
        console.log("Data é maior!");
      }
    }
    return startDate ? date.getTime() > startDate.getTime() : true;
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
          placeholderText="Selecione o horário inicial"
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
          placeholderText="Selecione o horário limite"
        />
      </div>
      <Button onClick={handleSave}>Registrar Datas</Button>
    </div>
  );
};

export default DatePickerComponent;
