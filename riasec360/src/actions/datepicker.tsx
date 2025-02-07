"use client";
import React, { useState, useMemo } from "react";
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
  // State for start date and duration
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [duration, setDuration] = useState({ hours: "1", minutes: "0" });

  // Calculate end date based on start date and duration
  const endDate = useMemo(() => {
    if (!startDate) return null;

    const hours = parseInt(duration.hours, 10) || 0;
    const minutes = parseInt(duration.minutes, 10) || 0;
    const durationInMilliseconds = hours * 60 * 60 * 1000 + minutes * 60 * 1000;

    return new Date(startDate.getTime() + durationInMilliseconds);
  }, [startDate, duration.hours, duration.minutes]);

  // Handle duration input changes
  const handleDurationChange =
    (type: "hours" | "minutes") => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setDuration((prev) => ({ ...prev, [type]: value }));
    };

  // Handle start date change
  const handleStartDateChange: DatePickerProps["onChange"] = (
    date: Date | null
  ) => {
    setStartDate(date);
  };

  // Handle save action
  const handleSave = () => {
    callBackData({ startDate, endDate });
  };

  // Check if a date is in the past
  const isPastDate = (date: Date) => date < new Date();

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
      </div>

      <div>
        <label>Duração:</label>
        <label>
          Horas:
          <input
            type="number"
            value={duration.hours}
            onChange={handleDurationChange("hours")}
            min="0"
          />
        </label>
        <label>
          Minutos:
          <input
            type="number"
            value={duration.minutes}
            onChange={handleDurationChange("minutes")}
            min="0"
          />
        </label>
      </div>

      {endDate && (
        <div>
          <h3>Horario final:</h3>
          <p>{endDate.toString()}</p>
        </div>
      )}

      <Button onClick={handleSave}>Registrar Datas</Button>
    </div>
  );
};

export default DatePickerComponent;
