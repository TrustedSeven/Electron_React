export const DaysInWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thrusday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const DaysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export const MonthName = [
  "January",
  "Feburary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const checkYearIsLeap = (year) => {
  if ((0 === year % 4 && 0 !== year % 100) || 0 === year % 400) {
    return 29;
  } else {
    return 28;
  }
};

export const getMonthIndex = (month) => {
  const index = MonthName.findIndex(
    (mon) => mon.toLowerCase().substr(0, 3) === month.toLowerCase()
  );
  if (index !== -1) {
    return index + 1;
  }
};
