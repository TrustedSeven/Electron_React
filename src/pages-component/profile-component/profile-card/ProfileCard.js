import React from "react";
import "./styles.css";
import edit from "../../../assests/images/edit.svg";
import mastercard from "../../../assests/images/mastercard.svg";

function ProfileCard({ data, activeRow, onEdit, onPress }) {
  return (
    <div
      style={{ border: activeRow.length > 0 && "3px solid #b3d1e9" }}
      onClick={(event) => onPress({ event, row: data })}
      className="profile-card profile-card-row"
    >
      <div
        className={`profile-card-top-section ${
          activeRow.length > 0 && "no-border"
        }`}
      >
        <div className="profile-card-top">
          <h1> {data?.cardDetails?.profileName}</h1>
          <div onClick={() => onEdit(data)} className="profile-card-edit-btn">
            <img className="icon-btn" src={edit} alt="" />
          </div>
        </div>
        <div className="profile-card-details">
          <p id="card-nuumber-masking-line">
            {maskcardNumber(data?.cardDetails?.cardNumber).map((w, i) => (
              <span
                style={{
                  margin: (i === 4 || i === 9 || i === 14) && "0px 3px",
                }}
                key={`mask-card-num-${i}-${w}`}
              >
                {w}
              </span>
            ))}
          </p>
          <img src={mastercard} alt="" />
        </div>
        <p className="profile-user-name">{data?.cardDetails?.cardName}</p>
      </div>
      <div
        className={`profile-card-bottom ${activeRow.length > 0 && "no-border"}`}
      >
        {!data?.isBillingSameToShipping ? (
          <>
            <p className="delivery-title">Billing</p>
            <p className="deleivery-name">
              {data?.billingDetails?.fName}
              {"\t"}
              {data?.billingDetails?.lName}
            </p>
            <p className="delivery-address">
              {data?.billingDetails?.address1}
              {"\n"}
              {data?.billingDetails?.address2}
            </p>
          </>
        ) : (
          <>
            <p className="delivery-title">Billinig</p>
            <p className="deleivery-name">
              {data?.shippingDetails?.fName}
              {"\t"}
              {data?.shippingDetails?.lName}
            </p>
            <p className="delivery-address">
              {data?.shippingDetails?.address1}
              {"\n"}
              {data?.shippingDetails?.address2}
            </p>
          </>
        )}
        <div style={{ height: "10px" }} />
        <p className="delivery-title">Shipping</p>
        <p className="deleivery-name">
          {data?.shippingDetails?.fName}
          {"\t"}
          {data.shippingDetails.lName}
        </p>
        <p className="delivery-address">
          {data?.shippingDetails?.address1}
          {"\n"}
          {data?.shippingDetails?.address2}
        </p>
      </div>
    </div>
  );
}

export default ProfileCard;

const maskcardNumber = (cardNumber = "") => {
  let arr = [];
  for (let i = 0; i < 14; i++) {
    if (i === 4 || i === 9) {
      arr.push("");
    } else {
      arr.push("*");
    }
  }
  cardNumber
    .split("")
    .slice(14)
    .forEach((w) => {
      arr.push(w);
    });
  return arr;
};
