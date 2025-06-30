import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function DashboardCalendar() {
  const [date, setDate] = useState<Value>(new Date());

  const handleDateChange = (value: Value, event: React.MouseEvent<HTMLButtonElement>) => {
    setDate(value);
  };
  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">Calendar</h3>
      <Calendar
        onChange={handleDateChange}
        value={date}
        className="rounded-lg border border-gray-200 p-2"
      />
    </div>
  );
}
