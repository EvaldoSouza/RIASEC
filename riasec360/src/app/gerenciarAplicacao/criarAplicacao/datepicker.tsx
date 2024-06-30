"use client";
import React, { useState, useEffect } from "react";
import DatePicker, { DatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@/components/ui/button";

interface DatePickerInterface {
  callBackData: (data: {
    startDate: Date | null;
    endDate: Date | null;
  }) => void;
}

const DatePickerComponent: React.FC<DatePickerInterface> = ({
  callBackData,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [durationHours, setDurationHours] = useState<string>("1");
  const [durationMinutes, setDurationMinutes] = useState<string>("0");

  useEffect(() => {
    if (startDate) {
      const endDateTime = calculateEndDateTime();
      setEndDate(endDateTime);
    }
  }, [startDate, durationHours, durationMinutes]);

  const handleDurationHoursChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = e.target.value;
    if (newValue !== durationHours) {
      setDurationHours(newValue);
    }
  };

  const handleDurationMinutesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = e.target.value;
    if (newValue !== durationMinutes) {
      setDurationMinutes(newValue);
    }
  };

  const calculateEndDateTime = (): Date | null => {
    const durationInMilliseconds =
      parseInt(durationHours, 10) * 60 * 60 * 1000 +
      parseInt(durationMinutes, 10) * 60 * 1000;

    if (isNaN(durationInMilliseconds)) return null;

    if (startDate) {
      return new Date(startDate.getTime() + durationInMilliseconds);
    } else {
      return null;
    }
  };

  const handleStartDateChange: DatePickerProps["onChange"] = (
    date: Date | null
  ) => {
    if (date !== startDate) {
      setStartDate(date as Date);
    }
  };

  const handleSave = () => {
    callBackData({ startDate, endDate });
  };

  const isPastDate = (date: Date) => {
    return date < new Date();
  };

  return (
    <div>
      <div>
        <label htmlFor="start-date">Data do Teste:</label>
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
        <div>
          <label htmlFor="duration"> Duração: </label>
          <label>
            Horas:
            <input
              type="number"
              value={durationHours}
              onChange={handleDurationHoursChange}
              min="0"
            />
          </label>
          <label>
            Minutos:
            <input
              type="number"
              value={durationMinutes}
              onChange={handleDurationMinutesChange}
              min="0"
            />
          </label>
          {endDate && (
            <div>
              <h3>Horario final:</h3>
              <p>{endDate.toString()}</p>
            </div>
          )}
        </div>
      </div>

      <Button onClick={handleSave}>Registrar Datas</Button>
    </div>
  );
};

export default DatePickerComponent;
