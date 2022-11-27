import React from "react";

const Footer = () => {
  return (
    <div className="footer">
      <div className="about">
        <h3>Little Basket.com</h3>
        <p>
          Little Basket is your ultimate destination for your awesome shopping
          experience. We are ace in the field of Apparels, Musical Instruments,
          Books and Technological Gadgets. Many more categories to be added in
          the future.
        </p>
        <div className="payment-services">
          <img src="https://img.icons8.com/color/48/000000/visa.png" />
          <img src="https://img.icons8.com/fluency/48/000000/mastercard-credit-card.png" />
          <img src="https://img.icons8.com/color/48/000000/paytm.png" />
          <img src="https://img.icons8.com/color/48/000000/rupay.png" />
          <img src="https://img.icons8.com/color/48/000000/stripe.png" />
        </div>
      </div>
      <div className="links">
        <h3>Useful Links</h3>
        <div className="links-container">
          <ul>
            <li>Home</li>
            <li>My Account</li>
            <li>Wishlists</li>
            <li>Order Tracking</li>
          </ul>
          <ul>
            <li>Products</li>
            <li>My Cart</li>
            <li>Settings</li>
            <li>Terms</li>
          </ul>
        </div>
      </div>
      <div className="contact">
        <h3>Contact</h3>
        <div className="contact-container">
          <div className="info">
            <div>
              <i className="fa-solid fa-location-dot"></i>
              <p>2940 Central Avenue, Rochelle Park - 07662</p>
            </div>
            <div>
              <i className="fa-solid fa-phone"></i>
              <p>862-252-6729</p>
            </div>
            <div>
              <i className="fa-solid fa-envelope"></i>
              <p>contact@littlebasket.com</p>
            </div>
          </div>
          <div className="socials">
            <img src="https://img.icons8.com/fluency/48/000000/facebook-new.png" />
            <img src="https://img.icons8.com/fluency/48/000000/instagram-new.png" />
            <img src="https://img.icons8.com/color/48/000000/twitter--v1.png" />
            <img src="https://img.icons8.com/color/48/000000/pinterest--v1.png" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
