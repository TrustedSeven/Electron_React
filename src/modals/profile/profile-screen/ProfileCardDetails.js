import React from "react";
import {
  AppInputField,
  AppButtonWithicon,
  AppSpacer,
} from "../../../component";
import "../styles.css";
import right from "../../../assests/images/right.svg";
import { getMonthList, getYearList } from "../../../config/sites-config";

function ProfileCardDetails({
  handleModal,
  handleScreen,
  handleChange,
  handleMonth,
  handleYear,
  profile,
  invalidField,
}) {
  return (
    <div>
      <div className="flex-row">
        <div className="flex-half">
          <AppInputField
            placeholderText="Enter Profile Name"
            fieldTitle="Profile Name"
            onChange={handleChange}
            name="profileName"
            value={profile["cardDetails"]["profileName"]}
            invalid={invalidField === "profileName"}
          />
        </div>
        <div className="flex-half margin-left">
          <AppInputField
            placeholderText="Enter Cardholder Name"
            fieldTitle="Cardholder Name"
            onChange={handleChange}
            name="cardName"
            value={profile["cardDetails"]["cardName"]}
            invalid={invalidField === "cardName"}
          />
        </div>
      </div>
      <AppSpacer space={10} />
      <div className="flex-row">
        <div className="flex-half">
          <div className="flex-row">
            <div style={{ flex: 1 }} className="flex-half">
              <AppInputField
                isCustomInputField={true}
                format="#### #### #### ####"
                placeholderText="1234 1234 1234 1234"
                fieldTitle="Card Number"
                onChange={handleChange}
                name="cardNumber"
                value={profile["cardDetails"]["cardNumber"]}
                invalid={invalidField === "cardNumber"}
              />
            </div>
            <div className="flex-half cvv-card-holder margin-left">
              <AppInputField
                placeholderText="CVV"
                fieldTitle="CVV"
                isCustomInputField={true}
                format="###"
                onChange={handleChange}
                name="cardCVV"
                value={profile["cardDetails"]["cardCVV"]}
                invalid={invalidField === "cardCVV"}
              />
            </div>
          </div>
        </div>
        <div className="flex-half margin-left">
          <div className="flex-row">
            <div className="flex-half">
              <AppInputField
                placeholderText="February"
                fieldTitle="Expiry Month"
                onChange={handleMonth}
                name="cardExpiryMonth"
                value={getMonthList.filter(
                  (year) =>
                    year.value === profile["cardDetails"]["cardExpiryMonth"]
                )}
                isSelect={true}
                selectOptions={getMonthList}
                invalid={invalidField === "cardExpiryMonth"}
              />
            </div>
            <div className="flex-half margin-left">
              <AppInputField
                placeholderText="2025"
                fieldTitle="Expiry Year"
                onChange={handleYear}
                name="cardExpiryYear"
                value={getYearList().filter(
                  (year) =>
                    year.value === profile["cardDetails"]["cardExpiryYear"]
                )}
                isSelect={true}
                selectOptions={getYearList()}
                invalid={invalidField === "profileExpiryYear"}
              />
            </div>
          </div>
        </div>
      </div>
      <AppSpacer space={10} />
      <div className="flex-row">
        <div className="flex-half">
          <AppInputField
            placeholderText="johndoe@gmail.com"
            fieldTitle="Email Address"
            onChange={handleChange}
            name="email"
            value={profile["cardDetails"]["email"]}
            type="email"
            invalid={invalidField === "email"}
          />
        </div>
        <div className="flex-half margin-left">
          <AppInputField
            placeholderText="615-548-5123"
            fieldTitle="Phone Number"
            onChange={handleChange}
            isCustomInputField={true}
            format="### ### ####"
            name="phone"
            value={profile["cardDetails"]["phone"]}
            invalid={invalidField === "phone"}
          />
        </div>
      </div>
      <AppSpacer space={30} />
      <div className="custom-profile-bottom">
        <div onClick={handleModal} className="modal-cancel-btn btn">
          <span>Cancel</span>
        </div>
        <div className="profile-address-same">
          <AppButtonWithicon
            onClick={() => handleScreen("shipping")}
            isReverse={true}
            image={right}
            btnTitle="Shipping"
          />
        </div>
      </div>
    </div>
  );
}

export default ProfileCardDetails;
