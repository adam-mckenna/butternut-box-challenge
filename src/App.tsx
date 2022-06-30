import React, { useEffect, useState } from "react";

import { animated, useSpring, easings } from "@react-spring/web";

import { addDays, format, getDay } from "date-fns";

import Calendar from "./components/Calendar/Calendar";

import { ReactComponent as VanIcon } from "./img/van.svg";

import "./App.scss";

const Modal = ({
  isVisible,
  children,
  onModalClose
}: {
  isVisible: boolean;
  children: JSX.Element;
  onModalClose: () => void;
}) => {
  const styles = useSpring({
    from: { opacity: isVisible ? 0 : 1 },
    to: { opacity: isVisible ? 1 : 0 },
    config: { duration: 500, easing: easings.easeOutQuart },
  });

  return (
    <animated.div
      onClick={({ target, currentTarget }) => {
        if (target === currentTarget) {
          onModalClose();
        }
      }}
      className="modal"
      style={styles}
    >
      {children}
    </animated.div>
  );
};

const ModalBody = ({
  isVisible,
  children,
}: {
  isVisible: boolean;
  children: JSX.Element;
}) => {
  const styles = useSpring({
    from: {
      y: isVisible ? 150 : 0,
    },
    to: {
      y: isVisible ? 0 : 150,
    },
    config: { duration: 1000, easing: easings.easeOutQuart },
  });

  return (
    <animated.div
      className={`modal-body ${!isVisible ? "modal-body--disabled" : ""}`}
      style={styles}
    >
      {children}
    </animated.div>
  );
};

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isExitAnimating, setIsExitAnimating] = useState(false);

  const [confirmedDate, setConfirmedDate] = useState(new Date());

  const today = new Date();

  const onModalClose = () => {
    setIsExitAnimating(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsExitAnimating(false);
    }, 500);
  }

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

    setConfirmedDate(getEarliestAvailableDate(today));
  }, [setConfirmedDate]);

  return (
    <div className="app">
      <h2 className="title">
        Choose your delivery day
        <span className="tab">Delivery is always free</span>
      </h2>

      <div className="card">
        <div className="card-body">
          <p>{format(confirmedDate, "EEE MMMM do")}</p>

          <span className="tab">
            <VanIcon />
            Earliest delivery
          </span>
        </div>

        <button
          className="card-button"
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          <div className="card-button-calendar">
            <p>{format(confirmedDate, "d")}</p>
          </div>
          <p>Change</p>
        </button>

        {isModalOpen && (
          <Modal isVisible={!isExitAnimating} onModalClose={onModalClose}>
            <ModalBody isVisible={!isExitAnimating}>
              <Calendar
                today={today}
                onModalClose={onModalClose}
                confirmedDate={confirmedDate}
                setConfirmedDate={setConfirmedDate}
              />
            </ModalBody>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default App;
