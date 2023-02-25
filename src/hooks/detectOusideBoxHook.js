import { useEffect } from "react";

export default function useOutsideAlerter({
  ref,
  datePickerSetter,
  timePickerSetter,
  dateState,
  timeState,
}) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        datePickerSetter((pre) => {
          return pre === true && false;
        });
        timePickerSetter((pre) => {
          return pre === true && false;
        });
      } else {
        if (!timeState) {
          if (!dateState) {
            datePickerSetter((pre) => {
              return true;
            });
          }
        }
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref, datePickerSetter, timePickerSetter, dateState, timeState]);
}
