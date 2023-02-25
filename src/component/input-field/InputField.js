import React from "react";
import "./inputfield.css";
import Select from "react-select";
import { ToastWarning } from "../../toaster";
import { selectStyles } from "./styles/styles";
import { DefaultOptions } from "../../config/sites-config";
import DateTimePicker from "../date-time-picker/DateTimePicker";
import NumberFormat from "react-number-format";
import RadioWithLabel from "../radio-with-label/RadioWithLabel";
import {
  CheckBoxSelection,
  Inject,
  MultiSelectComponent,
} from "@syncfusion/ej2-react-dropdowns";
import down from "../../assests/images/down.svg";

function InputField({
  isEdit = false,
  isCustomInputField = false,
  isSelect = false,
  placeholderText = "Select Site",
  fieldTitle = "Site",
  hideLabel = false,
  padding = "10px",
  isDate = false,
  isCustomReactSelect = false,
  format = "### ### ####",
  defaultValue = "",
  isMulti = false,
  multiHeight = "150px",
  selectOptions = DefaultOptions,
  onDateTimeChange,
  isSelectDisable = false,
  isProfileCustomSelect = false,
  timeChange,
  invalid = false,
  dateDisable = false,
  selectedProfileValue,
  isMultiSelect = false,
  ...props
}) {
  return (
    <div className="input-field-container">
      {!hideLabel && <label>{fieldTitle}</label>}
      {!isSelect ? (
        <div className="input-field-box">
          {!isMulti ? (
            !isDate ? (
              !isCustomInputField ? (
                <input
                  style={{ border: invalid && "1px solid #F05555" }}
                  {...props}
                  autoSave="off"
                  autoCapitalize="off"
                  autoCorrect="off"
                  autoComplete="off"
                  placeholder={placeholderText}
                />
              ) : (
                <NumberFormat
                  style={{ border: invalid && "1px solid #F05555" }}
                  {...props}
                  autoSave="off"
                  autoCapitalize="off"
                  autoCorrect="off"
                  autoComplete="off"
                  placeholder={placeholderText}
                  format={format}
                />
              )
            ) : (
              <div className="date-time-picker-wrapper">
                <DateTimePicker
                  {...props}
                  invalid={invalid}
                  disable={dateDisable}
                  {...{ onDateTimeChange }}
                  onError={(error) => ToastWarning(error)}
                />
              </div>
            )
          ) : (
            <textarea
              style={{
                height: multiHeight,
                border: invalid && "1px solid #F05555",
              }}
              {...props}
              placeholder={placeholderText}
            ></textarea>
          )}
        </div>
      ) : (
        <div className="input-field-box">
          {!isCustomReactSelect ? (
            <Select
              {...props}
              placeholder={placeholderText}
              isOptionSelected={true}
              options={selectOptions}
              styles={selectStyles}
              isDisabled={isSelectDisable}
              isSearchable={false}
              isMulti={isMultiSelect}
            />
          ) : !isProfileCustomSelect ? (
            <Select
              {...props}
              isOptionSelected={true}
              placeholder={placeholderText}
              options={selectOptions}
              styles={selectStyles}
              isDisabled={isSelectDisable}
              isSearchable={false}
              components={{
                Option: (optionProps) => (
                  <CustomOptionWithRadio {...{ optionProps, props }} />
                ),
              }}
            />
          ) : (
            <MultiGroupSelect
              placeholderText={placeholderText}
              {...props}
              dataSource={selectOptions}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default InputField;

const CustomOptionWithRadio = ({ optionProps, props }) => {
  const { data, innerProps, innerRef } = optionProps;
  const { value } = props;

  return (
    <React.Fragment>
      {data["index"] === 0 ? (
        <RadioWithLabel
          parentProps={innerRef}
          checkBoxProps={innerProps}
          checked={
            value?.length > 0 ? value[0]["value"] === data["value"] : false
          }
          label={data["label"]}
          id={data["id"]}
        />
      ) : (
        <RadioWithLabel
          checked={value?.length > 0 ? value[0]["id"] === data["id"] : false}
          label={data["label"]}
          parentProps={innerRef}
          checkBoxProps={innerProps}
          id={data["id"]}
        />
      )}
      <div
        style={{
          height: "0.5px",
          background: "rgba(56, 110, 180, 0.5)",
          width: "90%",
          margin: "0px auto",
        }}
      />
    </React.Fragment>
  );
};

const MultiGroupSelect = ({ dataSource, placeholderText, ...props }) => {
  const fields = { groupBy: "profileGroup", text: "title", value: "id" };
  return (
    <React.Fragment>
      <MultiSelectComponent
        {...props}
        cssClass="asfhdafdsagdfhsdhfghfgfg"
        id="mtselement"
        popupHeight="200px"
        fields={fields}
        dataSource={dataSource}
        placeholder={placeholderText}
        mode="CheckBox"
        enableGroupCheckBox="true"
        allowFiltering="false"
        showSelectAll="true"
        children={<h1>sdjgdfgk</h1>}
        filterBarPlaceholder="Search Profile"
      >
        <Inject services={[CheckBoxSelection]} />
      </MultiSelectComponent>
      {/* <img id="e-mult-select-dropdown-icon" src={down} alt="" /> */}
    </React.Fragment>
  );
};
