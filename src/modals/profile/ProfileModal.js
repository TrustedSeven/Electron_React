import "./styles.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppSpacer } from "../../component";
import { ToastSuccess, ToastWarning } from "../../toaster";
import {
  CardDetailValidationSchema as CardSchema,
  ShippingSchema,
} from "../../validationSchema";
import {
  fetchEditModalState,
  fetchTempStorageState,
  setProfileModalState,
  setTempStorage,
  setTriggerModal,
} from "../../features/counterSlice";
import ProfileCardDetailsScreen from "./profile-screen/ProfileCardDetails";
import {
  addProfileInGroup,
  editSingleProfile,
} from "../../features/logic/profile-reducer-logic";
import dot from "../../assests/images/dot-chain.svg";
import ProfileBillingDetailScreen from "./profile-screen/ProfileBillingdetails";
import ProfileShippingDetailsScreen from "./profile-screen/ProfileShippingDetails";

const ADDRES_SCHEMA = {
  fName: "",
  lName: "",
  address1: "",
  address2: "",
  city: "",
  province: "",
  postalCode: "",
  country: "",
};

function ProfileModal() {
  const [screen, setScreen] = useState("card");
  const [invalidField, setInvalidField] = useState("");
  const state = useSelector(fetchEditModalState);
  const editedRow = useSelector(fetchTempStorageState);
  const [profile, setProfile] = useState({
    cardDetails: {
      profileName: "",
      cardName: "",
      cardNumber: "",
      cardCVV: "",
      cardExpiryMonth: "",
      cardExpiryYear: "",
      email: "",
      phone: "",
    },
    shippingDetails: ADDRES_SCHEMA,
    billingDetails: ADDRES_SCHEMA,
    isBillingSameToShipping: false,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (state === "edit-single-profile") {
      setProfile((pre) => {
        return { ...editedRow };
      });
    }
    return () => {
      dispatch(setTriggerModal(""));
      dispatch(setTempStorage({}));
    };
  }, [editedRow, dispatch, state]);

  /**
   * Handle modal state
   * */
  const handleModal = () => {
    dispatch(setProfileModalState());
  };

  /**
   * Helper Function to Validate Card Details
   */
  const cardDetailValidationHelper = () => {
    const { error } = CardSchema.validate(profile.cardDetails);
    if (error?.details.length > 0) {
      error?.details.forEach((error) => {
        let key = error.context.key;
        if (key !== invalidField) {
          setInvalidField(key);
        } else {
          ToastWarning(error.context.label);
        }
      });
      return false;
    } else return true;
  };

  /**
   * Helper Function to Validate Shipping or Billing Details
   */
  const shippingValidation = (key = "shippingDetails") => {
    const { error } = ShippingSchema.validate(profile[key]);
    if (error?.details.length > 0) {
      error?.details.forEach((error) => {
        let key = error.context.key;
        if (key !== invalidField) {
          setInvalidField(key);
        } else {
          console.log(error);
          ToastWarning(error.context.label);
        }
      });
      return false;
    } else return true;
  };

  /**
   * Handler to Navigate Screen
   * */
  const handleScreen = (screen) => {
    let valid = false;
    if (screen === "shipping" || screen === "card") {
      setInvalidField("");
      valid = cardDetailValidationHelper();
    }
    if (screen === "billing" || profile.isBillingSameToShipping) {
      setInvalidField("");
      valid = shippingValidation();
    }
    if (valid) {
      setScreen(screen);
    }
    if (screen === "card") {
      setProfile((pre) => {
        return { ...pre, isBillingSameToShipping: false };
      });
    }
  };

  /**
   * Handler to input change
   * */
  const handleChange = (e) => {
    const cardDetailsKeyValue = Object.keys(profile.cardDetails);
    const { value, name } = e.target;
    if (cardDetailsKeyValue.includes(name)) {
      setProfile((pre) => {
        return { ...pre, cardDetails: { ...pre.cardDetails, [name]: value } };
      });
    } else {
      if (screen === "shipping") {
        setProfile((pre) => {
          return {
            ...pre,
            shippingDetails: { ...pre.shippingDetails, [name]: value },
          };
        });
      } else if (screen === "billing") {
        setProfile((pre) => {
          return {
            ...pre,
            billingDetails: { ...pre.billingDetails, [name]: value },
          };
        });
      }
    }
  };

  /**
   * Handler to Month Select
   * */
  const handleMonth = ({ value }) => {
    setProfile((pre) => {
      return {
        ...pre,
        cardDetails: { ...pre.cardDetails, cardExpiryMonth: value },
      };
    });
  };

  /**
   * Handler to Year Select
   * */
  const handleYear = ({ value }) => {
    setProfile((pre) => {
      return {
        ...pre,
        cardDetails: { ...pre.cardDetails, cardExpiryYear: value },
      };
    });
  };

  /**
   * Handler to Provinse Select
   * */
  const handleProvince = ({ value }) => {
    if (screen === "shipping") {
      setProfile((pre) => {
        return {
          ...pre,
          shippingDetails: { ...pre.shippingDetails, province: value },
        };
      });
    } else if (screen === "billing") {
      setProfile((pre) => {
        return {
          ...pre,
          billingDetails: { ...pre.billingDetails, province: value },
        };
      });
    }
  };

  const handleCountry = ({ value }) => {
    if (screen === "shipping") {
      setProfile((pre) => {
        return {
          ...pre,
          shippingDetails: { ...pre.shippingDetails, country: value },
        };
      });
    } else if (screen === "billing") {
      setProfile((pre) => {
        return {
          ...pre,
          billingDetails: { ...pre.billingDetails, country: value },
        };
      });
    }
  };

  /**
   * Handler to Checkbox
   * */
  const handleBillingShipping = (e) => {
    const { checked } = e.target;
    setProfile((pre) => {
      return { ...pre, isBillingSameToShipping: checked };
    });
  };

  /**
   * Handler to Submit button
   **/
  const handleSubmit = (e) => {
    if (profile.isBillingSameToShipping === false) {
      let valid = shippingValidation("billingDetails");
      if (valid) {
        if (state === "edit-single-profile") {
          dispatch(editSingleProfile(profile));
          ToastSuccess(`Profile Updated`);
        } else {
          dispatch(addProfileInGroup(profile));
          ToastSuccess(`Profile Created`);
        }
        handleModal();
      }
    } else {
      if (state === "edit-single-profile") {
        dispatch(editSingleProfile(profile));
        ToastSuccess(`Profile Updated`);
      } else {
        dispatch(addProfileInGroup(profile));
        ToastSuccess(`Profile Created`);
      }
      handleModal();
    }
  };

  return (
    <div className="modal-container">
      <div className="modal-inner">
        <div className="modal-top">
          <h3 onClick={() => console.log(profile)}>
            {state === "edit-single-profile" ? "Edit" : "New"} Profile
          </h3>
        </div>
        <AppSpacer space={50} />
        <div className="profile-card-slider-wrapper">
          <div
            onClick={() => handleScreen("card")}
            className={`profile-modal-btn ${
              screen === "card" && "active-screen"
            }`}
          >
            <span>Card Details</span>
          </div>
          <img src={dot} alt="" />
          <div
            onClick={() => {
              handleScreen("shipping");
              setProfile((pre) => {
                return { ...pre, isBillingSameToShipping: false };
              });
            }}
            className={`profile-modal-btn ${
              screen === "shipping" && "active-screen"
            }`}
          >
            <span>Shipping</span>
          </div>
          <img src={dot} alt="" />
          <div
            onClick={() => handleScreen("billing")}
            className={`profile-modal-btn ${
              screen === "billing" && "active-screen"
            }`}
          >
            <span>Billing</span>
          </div>
        </div>
        <AppSpacer space={20} />
        {screen === "card" ? (
          <ProfileCardDetailsScreen
            {...{
              handleModal,
              handleScreen,
              handleChange,
              handleMonth,
              handleYear,
              handleBillingShipping,
              profile,
              invalidField,
            }}
          />
        ) : (
          screen === "shipping" && (
            <ProfileShippingDetailsScreen
              {...{
                handleModal,
                handleScreen,
                handleChange,
                handleProvince,
                handleSubmit,
                handleBillingShipping,
                profile,
                invalidField,
                state,
                handleCountry,
              }}
              isValid={
                screen === "shipping" &&
                profile.isBillingSameToShipping === true
              }
            />
          )
        )}
        {screen === "billing" && (
          <ProfileBillingDetailScreen
            {...{
              handleModal,
              handleChange,
              handleProvince,
              handleSubmit,
              profile,
              invalidField,
              state,
              handleCountry,
            }}
          />
        )}
      </div>
    </div>
  );
}

export default ProfileModal;

// className={`profile-modal-btn ${
//   screen === "billing"
//     ? "active-screen"
//     : profile.isBillingSameToShipping === true && "active-screen"
// }`}

// SHIPPING BTN ACTIVE CONDITION
//   profile.isBillingSameToShipping === false &&
