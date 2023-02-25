import React from "react";
import {
  AppButtonWithicon,
  AppInputField,
  AppSpacer,
} from "../../../component";
import add from "../../../assests/images/add.svg";
import { DefaultOptions } from "../../../config/sites-config";
function ProfileBillingdetails({
  handleChange,
  handleModal,
  handleSubmit,
  handleProvince,
  profile,
  invalidField,
  handleCountry,
}) {
  return (
    <div>
      <div className="flex-row">
        <div className="flex-half">
          <AppInputField
            placeholderText="Enter First Name"
            fieldTitle="First Name"
            onChange={handleChange}
            name="fName"
            value={profile["billingDetails"]["fName"]}
            invalid={invalidField === "fName"}
          />
        </div>
        <div className="flex-half margin-left">
          <AppInputField
            placeholderText="Enter Last Name"
            fieldTitle="Last Name"
            onChange={handleChange}
            name="lName"
            value={profile["billingDetails"]["lName"]}
            invalid={invalidField === "lName"}
          />
        </div>
      </div>
      <AppSpacer space={10} />
      <div className="flex-row">
        <div className="flex-half">
          <AppInputField
            placeholderText="Enter Address 1"
            fieldTitle="Address 1"
            onChange={handleChange}
            name="address1"
            value={profile["billingDetails"]["address1"]}
            invalid={invalidField === "address1"}
          />
        </div>
        <div className="flex-half margin-left">
          <AppInputField
            placeholderText="Enter Address 2"
            fieldTitle="Address 2"
            onChange={handleChange}
            name="address2"
            value={profile["billingDetails"]["address2"]}
            invalid={invalidField === "address2"}
          />
        </div>
      </div>
      <AppSpacer space={10} />
      <div className="flex-row">
        <div className="flex-half">
          <div className="flex-row">
            <div style={{ flex: 1 }} className="flex-half">
              <AppInputField
                placeholderText="Canada"
                fieldTitle="Country"
                onChange={handleCountry}
                isSelect={true}
                name="country"
                value={DefaultOptions.filter(
                  (data) =>
                    data["value"] === profile["billingDetails"]["country"]
                )}
                invalid={invalidField === "country"}
              />
            </div>
            <div className="flex-half postal-input margin-left">
              <AppInputField
                placeholderText="Enter City"
                fieldTitle="City"
                onChange={handleChange}
                name="city"
                value={profile["billingDetails"]["city"]}
                invalid={invalidField === "city"}
              />
            </div>
          </div>
        </div>
        <div className="flex-half margin-left">
          <div className="flex-row">
            <div style={{ flex: 1 }} className="flex-half">
              <AppInputField
                placeholderText="Ontario"
                fieldTitle="Province"
                onChange={handleProvince}
                isSelect={true}
                name="province"
                invalid={invalidField === "province"}
                value={DefaultOptions.filter(
                  (data) =>
                    data["value"] === profile["billingDetails"]["province"]
                )}
              />
            </div>
            <div className="flex-half postal-input margin-left">
              <AppInputField
                placeholderText="Postal Code"
                fieldTitle="Postal Code"
                onChange={handleChange}
                name="postalCode"
                type="text"
                value={profile["billingDetails"]["postalCode"]}
                invalid={invalidField === "postalCode"}
              />
            </div>
          </div>
        </div>
      </div>
      <AppSpacer space={30} />
      <div className="custom-profile-bottom">
        <div onClick={handleModal} className="modal-cancel-btn btn">
          <span>Cancel</span>
        </div>
        <div className="profile-address-same">
          <AppButtonWithicon
            onClick={handleSubmit}
            image={add}
            btnTitle="New Profile"
          />
        </div>
      </div>
    </div>
  );
}

export default ProfileBillingdetails;
