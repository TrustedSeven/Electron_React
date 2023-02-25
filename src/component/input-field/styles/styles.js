export const selectStyles = {
  container: (styles, state) => ({
    ...styles,
    width: "100%",
    padding: "4px 3px",
    paddingLeft: "10px",
    borderRadius: "5px",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    boxSizing: "border-box",
    "&:hover": {
      border: state.isFocused && "1px solid #386EB4",
    },
  }),
  control: (styles) => ({
    ...styles,
    backgroundColor: "transparent",
    cursor: "pointer",
    boxShadow: "none",
    outline: "none",
    border: "none",
    color: "#ffffff",
    fontFamily: "SF-400",
  }),
  placeholder: (styles) => ({
    ...styles,
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: "13px",
    fontFamily: "SF-400",
  }),
  singleValue: (styles) => ({
    ...styles,
    color: "#ffffff",
    fontSize: "13px",
    lineHeight: "17px",
    fontFamily: "SF-400",
  }),
  indicatorSeparator: (styles) => ({
    ...styles,
    backgroundColor: "transparent",
  }),
  indicatorsContainer: (styles) => ({
    ...styles,
    svg: {
      fill: "rgba(255, 255, 255, 0.5)",
    },
  }),
  menuList: (styles) => ({
    ...styles,
    borderRadius: "5px",
    maxHeight: "250px",
    marginRight: "5px",
    "&::-webkit-scrollbar": {
      width: "5px",
    },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: "10px",
      backgroundColor: "#386EB4",
    },
    padding: "0px 5px",
  }),

  menu: (styles) => ({
    ...styles,
    zIndex: 3,
    backgroundColor: "#10172c",
    border: "1px solid #386EB4",
    marginLeft: "-10px",
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "#ffffff" : "rgba(255, 255, 255, 0.5)",
    padding: "10px",
    fontSize: "13px",
    lineHeight: "17px",
    fontFamily: "SF-400",
    backgroundColor: state.isSelected
      ? "rgba(255, 255, 255, 0.02)"
      : "transparent",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.02)",
    },
    borderBottom: "1px solid rgba(56, 110, 180, 0.5)",
  }),
};
