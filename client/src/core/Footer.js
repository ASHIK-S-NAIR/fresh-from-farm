import React from "react";

const Footer = () => {
  return (
    <section className="footer-section">
      <div className="wrap footer-wrap">
        <div className="footer-sub-sec">
          <h3 className="footer-sub-sec-heading">Location</h3>
          <p className="footer-sub-sec-p">Berangler, Ladkhan</p>
          <p className="footer-sub-sec-p">Noufino, 671541</p>
        </div>
        <div className="footer-sub-sec">
          <h3 className="footer-sub-sec-heading">Information</h3>
          <p className="footer-sub-sec-p">About Us</p>
          <p className="footer-sub-sec-p">Contact</p>
        </div>
        <div className="footer-sub-sec">
          <h3 className="footer-sub-sec-heading">My Account</h3>
          <p className="footer-sub-sec-p">My Account</p>
          <p className="footer-sub-sec-p">My Orders</p>
          <p className="footer-sub-sec-p">My Settings</p>
          <p className="footer-sub-sec-p">My Cart</p>
        </div>
        <div className="footer-sub-sec">
          <h3 className="footer-sub-sec-heading">Categories</h3>
          <p className="footer-sub-sec-p">Vegetables</p>
          <p className="footer-sub-sec-p">Fruits</p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
