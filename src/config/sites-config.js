export const DefaultOptions = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

export const getYearList = () => {
  let arr = [];
  let counter = 0;
  const d = new Date().getFullYear();
  for (let i = 0; i < 20; i++) {
    var obj = {};
    obj["label"] = d + counter;
    obj["value"] = d + counter;
    counter++;
    arr.push(obj);
  }
  return arr;
};

export const getMonthList = [
  { label: "January", value: "jan" },
  { label: "Feburary", value: "feb" },
  { label: "March", value: "mar" },
  { label: "April", value: "apr" },
  { label: "May", value: "may" },
  { label: "June", value: "june" },
  { label: "July", value: "july" },
  { label: "August", value: "aug" },
  { label: "September", value: "sep" },
  { label: "October", value: "oct" },
  { label: "November", value: "nov" },
  { label: "December", value: "dec" },
];
