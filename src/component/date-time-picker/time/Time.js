import React, { useEffect, useState } from "react";
import "./styles.css";
import up from "../../../assests/images/up.svg";
import down from "../../../assests/images/down.svg";
import calendar from "../../../assests/images/calendar.svg";

export default function TimePicker({
  onCalendarIconPress,
  timeHoursFormat = 12,
  onTimeChange,
  inpuitField,
  state,
}) {
  // const { time } = inpuitField;
  const [hour, setHour] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [timeType, setTimeType] = useState("AM");

  useEffect(() => {
    setHour(`00`);
    setMinutes(`00`);
    if (state !== "edit-task-row") {
    } else {
      // let arr = time?.split(":");
      // console.log(arr);
      // if (arr?.length > 2) {
      //   setHour(arr[0]);
      //   setMinutes(arr[1]);
      //   setTimeType(arr[2]);
      // } else {
      //   setHour(`00`);
      //   setMinutes(`00`);
      // }
    }
  }, [state]);

  /**
   * handler to Hours increement and decrement event
   * */
  const handleHourEvents = (increment = true) => {
    if (increment) {
      if (hour < timeHoursFormat) {
        let hr = hour;
        hr++;
        onTimeChange(`${hr}:${minutes}:${timeType}`);
        setHour(formatHourMinutes(hr));
      } else {
        setHour(formatHourMinutes(0));
        onTimeChange(`${0}:${minutes}:${timeType}`);
      }
    } else {
      if (hour > 0) {
        let hr = hour;
        hr--;
        onTimeChange(`${hr}:${minutes}:${timeType}`);
        setHour(formatHourMinutes(hr));
      } else {
        setHour(formatHourMinutes(timeHoursFormat));
        onTimeChange(`${timeHoursFormat}:${0}:${timeType}`);
      }
    }
  };

  /**
   *  handler to Minutes increment and decrement event
   * */
  const handleMinuteEvents = (increment = true) => {
    let min;
    if (increment) {
      if (minutes < 60) {
        min = minutes;
        min++;
        setMinutes(formatHourMinutes(min));
        onTimeChange(`${hour}:${min}:${timeType}`);
      } else {
        setMinutes(formatHourMinutes(0));
        onTimeChange(`${0}:${0}:${timeType}`);
      }
    } else {
      if (minutes > 0) {
        min = minutes;
        min--;
        onTimeChange(`${hour}:${min}:${timeType}`);
        setMinutes(formatHourMinutes(min));
      } else {
        setMinutes(formatHourMinutes(60));
        onTimeChange(`${0}:${60}:${timeType}`);
      }
    }
  };

  /**
   *  String handler to Set time format
   * */
  const handleTimeType = (type) => {
    setTimeType(type);
    onTimeChange(`${hour}:${minutes}:${type}`);
  };

  /**
   *  event function to handle Hour input Change
   * */
  const handleHourChange = (e) => {
    const { value } = e.target;
    if (
      value.length <= 2 &&
      Number(value) >= 0 &&
      Number(value) <= timeHoursFormat
    ) {
      setHour(value);
      onTimeChange(`${value}:${minutes}:${timeType}`);
    }
  };

  /**
   *  event function to handle Minute input Change
   * */
  const handleMinuteChange = (e) => {
    const { value } = e.target;
    if (value.length <= 2 && Number(value) >= 0 && Number(value) <= 59) {
      setMinutes(value);
      onTimeChange(`${hour}:${value}:${timeType}`);
    }
  };

  return (
    <div className="time-picker-outer-wrapper">
      <div className="time-picker-top-label">
        <p>Time to Start</p>
        <img src={calendar} alt="" onClick={onCalendarIconPress} />
      </div>
      <div className="time-picker-inner">
        <div className="time-picker-wrapper hour">
          <img
            src={up}
            alt=""
            onClick={() => handleHourEvents(true)}
            className="up-arrow btn"
          />
          <input onChange={handleHourChange} type="text" value={hour} />
          <img
            src={down}
            alt=""
            onClick={() => handleHourEvents(false)}
            className="down-arrow btn"
          />
        </div>
        <span id="time-seperator">:</span>
        <div className="time-picker-wrapper minute">
          <img
            src={up}
            alt=""
            onClick={() => handleMinuteEvents(true)}
            className="up-arrow btn"
          />
          <input type="text" onChange={handleMinuteChange} value={minutes} />
          <img
            src={down}
            alt=""
            onClick={() => handleMinuteEvents(false)}
            className="down-arrow btn"
          />
        </div>
        {timeHoursFormat <= 12 && (
          <div className="time-picker-type-wrapper">
            {["AM", "PM"].map((type) => (
              <div
                onClick={() => handleTimeType(type)}
                className={`${type === timeType && "active-time-type"}`}
                key={`time-picker-format-${type}`}
              >
                {type}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export const formatHourMinutes = (hour) => {
  return hour < 10 ? `0${hour}` : hour;
};
