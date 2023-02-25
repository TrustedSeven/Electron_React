import React, { useState, useRef, useEffect } from "react";
import "./styles.css";
import TimePicker, { formatHourMinutes } from "./time/Time";
import Calendar from "./calendar/Calendar";
import calendar from "../../assests/images/calendar.svg";
import useOutsideAlerter from "../../hooks/detectOusideBoxHook";
import { getMonthIndex } from "../../config/date-time-picker-config";
import { fetchEditModalState } from "../../features/counterSlice";
import { useSelector } from "react-redux";

const ArcAioDateTimePicker = ({
  timeHoursFormat,
  onDateTimeChange,
  dividerType = "-",
  onError,
  disable,
  invalid,
  ...props
}) => {
  const { value } = props;
  const [isTimePickerHide, setIsTimePickerHide] = useState(false);
  const [isDatePickerHide, setIsDatePickerHide] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState("");
  const state = useSelector(fetchEditModalState);
  const inputRef = useRef(null);

  const [inpuitField, setInputField] = useState({
    time: "",
    year: "",
    month: "",
    day: "",
  });

  /**
   * this hook Listen the click evebnt outside the DatePicker Component
   * */
  useOutsideAlerter({
    ref: inputRef,
    datePickerSetter: setIsDatePickerHide,
    timePickerSetter: setIsTimePickerHide,
    dateState: isDatePickerHide,
    timeState: isTimePickerHide,
  });

  useEffect(() => {
    if (value.length > 0 && state === "edit-task-row") {
      let arr = value.split(" ");
      // console.log(arr);
      if (arr?.length >= 6) {
        setInputField((pre) => {
          return {
            ...pre,
            year: arr[3],
            day: arr[2],
            month: arr[1],
            time: arr[5],
          };
        });
        let str = `${arr[0]} ${arr[1]} ${arr[2]} ${arr[3]} T`;
        setSelectedDateTime(str);
      }
    }
  }, [value, state]);

  // const handleCalendar = () => {
  //   if (inputRef.current !== document.activeElement) {
  //     inputRef.current.style.border = "1px solid #386eb4";
  //   }
  //   setIsDatePickerHide(!isDatePickerHide);
  // };

  /**
   * function handle the Time picker Modal State
   * */
  const handleTime = () => {
    if (state !== "edit-task-row") {
      let len = selectedDateTime.split("T").length;
      if (len >= 2) {
        setIsDatePickerHide((pre) => !pre);
        setIsTimePickerHide(!isTimePickerHide);
      } else {
        onError("Select Valid Date!!");
      }
    } else {
      setIsDatePickerHide((pre) => !pre);
      setIsTimePickerHide(!isTimePickerHide);
    }
  };

  /**
   * function handle the Calendar picker Modal State
   * */
  const handleTimeCalendarClicked = () => {
    setIsTimePickerHide(false);
    setIsDatePickerHide(true);
  };

  /**
   * function handle the Date Change Event
   * */
  const handleDateChange = (date) => {
    let dateString = `${date} T`;
    let arr = date.split(" ");
    if (arr?.length >= 4) {
      setInputField((pre) => {
        return { ...pre, year: arr[3], day: arr[2], month: arr[1] };
      });
      setSelectedDateTime(dateString);
      if (state === "edit-task-row") {
        let timeString = `${dateString} ${inpuitField["time"]}`;
        onDateTimeChange(timeString);
      }
    }
  };

  /**
   * function handle the Time Change Event
   * @param {string} date
   * */
  const handleTimeChange = (time) => {
    let sp = time?.split(":");
    if (sp?.length >= 2) {
      sp[0] = formatHourMinutes(Number(sp[0]));
      sp[1] = formatHourMinutes(Number(sp[1]));
      time = `${sp[0]}:${sp[1]}:${sp[2]}`;
    }
    let timeString = `${selectedDateTime} ${time}`;
    setInputField((pre) => {
      return { ...pre, time };
    });
    onDateTimeChange(timeString);
  };

  return (
    <div
      ref={inputRef}
      style={{
        pointerEvents: disable ? "none" : "unset",
        border: invalid && "1px solid #F05555",
      }}
      className="react-date-time-picker"
    >
      <div className="react-date-time-picker__wrapper">
        <div className="react-date-time-picker__inputGroup">
          {state === "edit-task-row"
            ? inpuitField.length > 0 && <label>Selected Date</label>
            : !isDatePickerHide &&
              selectedDateTime.length === 0 && <label>Selected Date</label>}

          <input
            style={{
              visibility: "hidden",
              position: "absolute",
              zIndex: "-999",
            }}
            type="datetime-local"
          />
          <input
            name="month"
            required
            min="1"
            readOnly
            max="12"
            className="react-date-time-picker__inputGroup__input react-date-time-picker__inputGroup__month  "
            type="text"
            value={getMonthIndex(inpuitField["month"])}
            style={{ width: `11px` }}
          />
          {selectedDateTime.length > 0 && (
            <span className="react-date-time-picker__inputGroup__divider">
              {dividerType}
            </span>
          )}
          <input
            min="1"
            max="31"
            readOnly
            name="day"
            required
            className="react-date-time-picker__inputGroup__input react-date-time-picker__inputGroup__day  "
            type="number"
            value={inpuitField["day"] || ""}
            style={{ width: `${inpuitField["day"].length * 9}px` }}
          />
          {selectedDateTime.length > 0 && (
            <span className="react-date-time-picker__inputGroup__divider">
              {dividerType}
            </span>
          )}
          <input
            required
            name="year"
            className="react-date-time-picker__inputGroup__input  react-date-time-picker__inputGroup__year "
            type="number"
            readOnly
            placeholder=""
            value={inpuitField["year"] || ""}
            style={{ width: `${inpuitField["year"].length * 9}px` }}
          />
          <span className="react-date-time-picker__inputGroup__divider">
            {/* {dividerType} */}
          </span>
          <input
            name="time"
            required
            readOnly
            className="react-date-time-picker__inputGroup__input react-date-time-picker__inputGroup__time  "
            type="text"
            value={inpuitField["time"] || ""}
          />
        </div>
        <button className="react-date-time-picker__button">
          <img src={calendar} alt="" />
        </button>
      </div>
      <span style={{ display: "contents" }}>
        <div
          className={`react-date-time-picker__calendar ${
            isDatePickerHide
              ? "react-date-time-picker__calendar--open"
              : "react-date-time-picker__calendar--closed"
          }  `}
        >
          <Calendar onDateChange={handleDateChange} onClockPress={handleTime} />
        </div>
        <div
          className={`react-date-time-picker__time ${
            isTimePickerHide
              ? "react-date-time-picker__time--open"
              : "react-date-time-picker__time--closed"
          }`}
        >
          <TimePicker
            onTimeChange={handleTimeChange}
            onCalendarIconPress={handleTimeCalendarClicked}
            {...{ timeHoursFormat, inpuitField, state }}
          />
        </div>
      </span>
    </div>
  );
};

export default ArcAioDateTimePicker;
