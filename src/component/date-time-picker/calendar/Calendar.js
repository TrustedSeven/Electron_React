import React, { useState } from "react";
import "./styles.css";
import {
  DaysInMonths,
  DaysInWeek,
  MonthName,
  checkYearIsLeap,
} from "../../../config/date-time-picker-config";
import watch from "../../../assests/images/watch.svg";
import backward from "../../../assests/images/backward.svg";
import forward from "../../../assests/images/forward.svg";

export default function Calendar({ onClockPress, onDateChange }) {
  const d = new Date();
  const [currentYear, setCurrentYear] = useState(d.getFullYear());
  const [currentMonth, setCurrentCalendarMonth] = useState(d.getMonth());
  const [activeDate, setActiveDate] = useState(d.toDateString());

  let MonthFirstDay = new Date(currentYear, currentMonth, 1).getDay();

  /**
   * HANDLE NEXT MONTH BUTTON
   * */
  const handleNextMonth = ({ onClockPress }) => {
    if (currentMonth < 11) {
      setCurrentCalendarMonth((pre) => pre + 1);
    } else {
      setCurrentCalendarMonth(0);
      setCurrentYear((year) => year + 1);
    }
  };

  /**
   * HANDLE PREVIOUS MONTH BUTTON
   * */
  const handlePreviousMonth = () => {
    if (currentMonth > 0) {
      setCurrentCalendarMonth((pre) => pre - 1);
    } else {
      setCurrentCalendarMonth(11);
      setCurrentYear((year) => year - 1);
    }
  };

  /**
   * HANDLE DATE SELECTED  BUTTON
   * */
  const handleDateSelected = (date) => {
    let buildDate = new Date(currentYear, currentMonth, date);
    setActiveDate(buildDate.toDateString());
    onDateChange(buildDate.toDateString());
  };

  return (
    <div className="calendar-parent-wrapper">
      <div className="calendar-buttons-wrapper">
        <div className="claendar-month-handlers-wrapper">
          <div className="claendar-button-month-label">
            <span>
              {MonthName[currentMonth]}
              {"\t"}
              {currentYear}
            </span>
          </div>
          <div
            onClick={handlePreviousMonth}
            className="calendar-previous-month-button"
          >
            <img src={backward} alt="" />
          </div>
          <div onClick={handleNextMonth} className="calendar-next-month-button">
            <img src={forward} alt="" />
          </div>
        </div>
        <img src={watch} alt="" onClick={onClockPress} />
      </div>
      <div className="calendar-weeks-name">
        {DaysInWeek.map((dayName) => (
          <span key={`calendar-dayName-${dayName}`}>
            {dayName.substring(0, 2)}
          </span>
        ))}
      </div>
      <div className="calendar-days-wrapper">
        {[...new Array(MonthFirstDay - 1)].map((_, i) => (
          <div
            key={`calendar-day-span-${i + 1}`}
            className="calendar-day-box calendar-day-box--previousMonthDay"
          >
            <button />
          </div>
        ))}

        {[
          ...new Array(
            currentMonth === 1
              ? checkYearIsLeap(currentYear)
              : DaysInMonths[currentMonth]
          ),
        ].map((_, i) => (
          <div
            style={{
              pointerEvents:
                currentMonth === new Date().getMonth()
                  ? i + 1 >= new Date().getDate()
                    ? "unset"
                    : "none"
                  : "unset",
            }}
            onClick={() => handleDateSelected(i + 1)}
            className={`calendar-day-box ${
              activeDate ===
              new Date(currentYear, currentMonth, i + 1).toDateString()
                ? "active-date"
                : ""
            } `}
            key={`calendar-button-day-${i}`}
          >
            <button>{i + 1}</button>
          </div>
        ))}
      </div>
    </div>
  );
}
