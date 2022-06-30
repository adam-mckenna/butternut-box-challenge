import React, { useState } from "react";

import { getDate, getDay, getDaysInMonth, startOfMonth } from "date-fns";

import "./Calendar.scss";

type CalendarProps = {
  today: Date;
  onModalClose: () => void;
  confirmedDate: Date;
  setConfirmedDate: React.Dispatch<React.SetStateAction<Date>>;
};

const Calendar = ({
  today,
  onModalClose,
  confirmedDate,
  setConfirmedDate
}: CalendarProps) => {
  const [selectedDate, setSelectedDate] = useState(confirmedDate);

  const isDateUnavailable = (dayOfTheMonth: number, offset: number) => {
    const position = dayOfTheMonth + (offset - 1);

    // Take the positions that are unavailable (e.g. Tue = 1), add values until they equal 7 
    // then check if divisible by 7 to validate whether the current position is on Tue, Fri or Sat
    return (
      (position + 6) % 7 === 0 ||
      (position + 3) % 7 === 0 ||
      (position + 2) % 7 === 0 
    );
  };

  return (
    <>
      <div className="calendar">
        <ul className="calendar-header">
            <li aria-label="Monday">M</li>
            <li aria-label="Tuesday">T</li>
            <li aria-label="Wednesday">W</li>
            <li aria-label="Thursday">T</li>
            <li aria-label="Friday">F</li>
            <li aria-label="Saturday">S</li>
            <li aria-label="Sunday">S</li>
        </ul>

        <div className="calendar-body">
          {Array.from({ length: getDaysInMonth(today) }).map((_, i) => {
            const isDisabled = isDateUnavailable(
              i,
              getDay(startOfMonth(today))
            );
            const isFirstPosition = i === 0;

            const dayOfMonth = i + 1;

            return (
              <button
                onClick={() => {
                  const date = new Date(
                    `${
                      today.getMonth() + 1
                    } ${dayOfMonth} ${today.getFullYear()}`
                  );
                  setSelectedDate(date);
                }}
                disabled={isDisabled}
                className={`
                  calendar-date 
                  ${isDisabled ? "calendar-date--disabled" : ""}
                  ${
                    isFirstPosition
                      ? `calendar-date--offset-${getDay(
                          startOfMonth(today)
                        )}`
                      : ""
                  }
                  ${
                    dayOfMonth === getDate(selectedDate)
                      ? "calendar-date--selected"
                      : ""
                  }
                `}
              >
                {dayOfMonth}
              </button>
            );
          })}
        </div>
      </div>

      <div className="button-group">
        <button
          className="button button--text"
          onClick={onModalClose}
        >
          Cancel, don't change
        </button>

        <button
          className="button"
          onClick={() => {
            onModalClose();
            setConfirmedDate(selectedDate);
          }}
        >
          Change date
        </button>
      </div>
    </>
  );
};

export default Calendar;
