import React from "react";

export const CartPayment = () => {
  return (
    <section className="cardPayment-section">
      <div className="wrap cardPayment-wrap">
        <div className="cardPayment-info-sec">
          <div className="cardPayment-delivery-details-sec">
            <h2 className="cardpayment-delivery-details-header">
              Delivery Details
            </h2>
            <div className="cardPayment-delivery-details">
              <div className="cardPayment-delivery-details-single-group">
                <div className="cardPayment-delivery-details-group">
                  <label className="cardPayment-delivery-details-label">
                    Name
                  </label>
                  <p className="cardPayment-delivery-details-value">name</p>
                </div>
              </div>
              <div className="cardPayment-delivery-details-double-group">
                <div className="cardPayment-delivery-details-group">
                  <label className="cardPayment-delivery-details-label">
                    Email
                  </label>
                  <p className="cardPayment-delivery-details-value">email</p>
                </div>
                <div className="cardPayment-delivery-details-group">
                  <label className="cardPayment-delivery-details-label">
                    Phone
                  </label>
                  <p className="cardPayment-delivery-details-value">
                    phoneNumber
                  </p>
                </div>
              </div>
              <h3 className="cardPayment-delivery-details-subheader">
                Shipping Address
              </h3>
              <div className="cardPayment-delivery-details-double-group">
                <div className="cardPayment-delivery-details-group">
                  <label className="cardPayment-delivery-details-label">
                    House Name
                  </label>
                  <p className="cardPayment-delivery-details-value">
                    houseName
                  </p>
                </div>
                <div className="cardPayment-delivery-details-group">
                  <label className="cardPayment-delivery-details-label">
                    Street Name
                  </label>
                  <p className="cardPayment-delivery-details-value">
                    streetName
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="cardPayment-payment-details-sec">
            <h2 className="cardPayment-payment-details-header">Payment Mode</h2>
            <div className="cardPayment-payment-details-form">
                <div className="cardPayment-payment-details-group">
                <input
                type="radio"
                name="payment_mode"
                id="RazoyPay"
                value="RazoyPay"
                checked="checked"
              />
              <label htmlFor="RazorPay" className="cardPayment-payment-details-label">Make Payment Online (RazorPay)</label>
                </div>
              
              <div className="cardPayment-payment-details-group">
              <input
                type="radio"
                name="payment_mode"
                id="COD"
                value="Cash On Delivery"
              />
              <label htmlFor="COD" className="cardPayment-payment-details-label">Cash On Delivery</label>
              </div>
              <button className="cardPayment-payment-details-btn">Make Payment</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
