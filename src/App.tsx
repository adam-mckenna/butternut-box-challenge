import { useEffect, useState } from "react";

import {
  addDays,
  getDate,
  getDay,
  getDaysInMonth,
  startOfMonth,
  format,
} from "date-fns";

import "./App.scss";

import { ReactComponent as VanIcon } from "./img/van.svg";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [confirmedDate, setConfirmedDate] = useState(new Date());

  const currentDate = new Date();

  const isDateUnavailable = (dayOfTheMonth: number, offset: number) => {
    const position = dayOfTheMonth + (offset - 1);

    // not great ...
    return (
      position === 1 ||
      position === 4 ||
      position === 5 ||
      position === 1 + 7 ||
      position === 4 + 7 ||
      position === 5 + 7 ||
      position === 1 + 14 ||
      position === 4 + 14 ||
      position === 5 + 14 ||
      position === 1 + 21 ||
      position === 4 + 21 ||
      position === 5 + 21 ||
      position === 1 + 28 ||
      position === 4 + 28 ||
      position === 5 + 28
    );
  };

  useEffect(() => {
    const getEarliestAvailableDate = (date: Date): Date => {
      let currentDay = getDay(date);
      const isCurrentDayUnavailable = (day: number) =>
        day === 2 || day === 5 || day === 6;
      while (isCurrentDayUnavailable(currentDay)) {
        date = addDays(date, 1);
        currentDay = getDay(date);
      }
      return date;
    };

    setSelectedDate(getEarliestAvailableDate(currentDate));
    setConfirmedDate(selectedDate);
  }, [setConfirmedDate, setSelectedDate]);

  return (
    <div>
      <h2 className="title">
        Choose your delivery day
        <span className="tab">Delivery is always free</span>
      </h2>
      <div className="card">
        <div>
          <p>{format(confirmedDate, "EEE MMMM do")}</p>
          <span className="tab">
            <VanIcon />
            Earliest delivery
          </span>
        </div>

        <button
          onClick={() => {
            setIsModalOpen(!isModalOpen);
          }}
        >
          Change
        </button>

        {isModalOpen && (
          <div
            className="modal"
            onClick={({ target, currentTarget}) => {
              if (target === currentTarget) {
                setIsModalOpen(false);
              }
            }}
          >
            <div className="modal-body">
              {/* ToDo: not certain on semantics -- would a table be better? */}
              <div className="calendar">
                <div className="calendar-header">
                  <ul>
                    <li aria-label="Monday">M</li>
                    <li aria-label="Tuesday">T</li>
                    <li aria-label="Wednesday">W</li>
                    <li aria-label="Thursday">T</li>
                    <li aria-label="Friday">F</li>
                    <li aria-label="Saturday">S</li>
                    <li aria-label="Sunday">S</li>
                  </ul>
                </div>

                <div className="calendar-body">
                  {Array.from({ length: getDaysInMonth(currentDate) }).map(
                    (_, i) => {
                      const isDisabled = isDateUnavailable(
                        i,
                        getDay(startOfMonth(currentDate))
                      );

                      const dateOfMonth = i + 1;
                      
                      return (
                      <button
                        onClick={() => {
                          const date = new Date(
                            `${currentDate.getMonth() + 1} ${
                              dateOfMonth
                            } ${currentDate.getFullYear()}`
                          )
                          setSelectedDate(date);
                        }}
                        disabled={isDisabled}
                        className={`
                          calendar-date 
                          ${
                            i === 0
                              ? `calendar-date--offset-${getDay(
                                  startOfMonth(currentDate)
                                )}`
                              : ""
                          }
                          ${isDisabled ? "calendar-date--disabled": ""}
                          ${dateOfMonth === getDate(selectedDate) ? "calendar-date--selected" : ""}
                        `}
                      >
                        {dateOfMonth}
                      </button>
                    )}
                  )}
                </div>
              </div>

              <div className="button-group">
                <button
                  className="button button--text"
                  onClick={() => {
                    setIsModalOpen(!isModalOpen);
                  }}
                >
                  Cancel, don't change
                </button>

                <button
                  className="button"
                  onClick={() => {
                    setIsModalOpen(!isModalOpen);
                    setConfirmedDate(selectedDate);
                  }}
                >
                  Change date
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
