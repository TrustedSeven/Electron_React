import React from "react";
import {
  AppButtonWithicon,
  AppInputField,
  AppSpacer,
  AppToggleBar,
} from "../../../component";
import add from "../../../assests/images/add.svg";
import right from "../../../assests/images/right.svg";
import wcheck from "../../../assests/images/wcheck.svg";
import { DefaultOptions } from "../../../config/sites-config";

function ProfileShippingDetails({
  handleModal,
  handleScreen,
  handleChange,
  handleProvince,
  handleSubmit,
  handleBillingShipping,
  isValid,
  profile,
  invalidField,
  state,
  handleCountry,
}) {
  const handleProfileCreation = () => {
    handleScreen("billing");
  };

  return (
    <div>
      <div className="flex-row">
        <div className="flex-half">
          <AppInputField
            placeholderText="Enter First Name"
            fieldTitle="First Name"
            onChange={handleChange}
            name="fName"
            value={profile["shippingDetails"]["fName"]}
            invalid={invalidField === "fName"}
          />
        </div>
        <div className="flex-half margin-left">
          <AppInputField
            placeholderText="Enter Last Name"
            fieldTitle="Last Name"
            onChange={handleChange}
            name="lName"
            value={profile["shippingDetails"]["lName"]}
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
            value={profile["shippingDetails"]["address1"]}
            invalid={invalidField === "address1"}
          />
        </div>
        <div className="flex-half margin-left">
          <AppInputField
            placeholderText="Enter Address 2"
            fieldTitle="Address 2"
            onChange={handleChange}
            name="address2"
            value={profile["shippingDetails"]["address2"]}
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
                    data["value"] === profile["shippingDetails"]["country"]
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
                value={profile["shippingDetails"]["city"]}
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
                value={DefaultOptions.filter(
                  (data) =>
                    data["value"] === profile["shippingDetails"]["province"]
                )}
                invalid={invalidField === "province"}
              />
            </div>
            <div className="flex-half postal-input margin-left">
              <AppInputField
                placeholderText="Postal Code"
                fieldTitle="Postal Code"
                onChange={handleChange}
                name="postalCode"
                type="text"
                value={profile["shippingDetails"]["postalCode"]}
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
          <AppToggleBar
            onChange={handleBillingShipping}
            name="isBillingSameToShipping"
            checked={profile["isBillingSameToShipping"]}
          />
          <span>Use same address for billing</span>
          <div>
            <AppButtonWithicon
              onClick={!isValid ? handleProfileCreation : handleSubmit}
              isReverse={!isValid ? true : false}
              image={
                !isValid
                  ? right
                  : state === "edit-single-profile"
                  ? wcheck
                  : add
              }
              btnTitle={
                !isValid
                  ? "Billing"
                  : `${
                      state === "edit-single-profile" ? "Save" : "New"
                    } Profile`
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileShippingDetails;
