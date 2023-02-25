import React from "react";
import RadioToggle from "../toggle/Toggle";
import "./styles.css";

function RadioWithLabel({
  label,
  checked,
  checkBoxProps,
  parentProps,
  id,
  isOnChangeCallback = false,
  ...checkedProps
}) {
  return (
    <div ref={parentProps} {...checkBoxProps} className="option-with-radio">
      {!isOnChangeCallback ? (
        <RadioToggle
          onChange={() => {}}
          inputType="radio"
          {...{ checked }}
          id={id}
        />
      ) : (
        <RadioToggle
          {...checkedProps}
          inputType="radio"
          {...{ checked }}
          id={id}
        />
      )}

      <span>{label}</span>
    </div>
  );
}

export default RadioWithLabel;
