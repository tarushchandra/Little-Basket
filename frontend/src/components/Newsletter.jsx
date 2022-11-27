import React from "react";

const Newsletter = () => {
  return (
    <div className="newsletter">
      <h1>Newsletter</h1>
      <div className="content">
        <p>Get updates from your favorite products</p>
        <div className="input-field">
          <input type="email" placeholder="Your Email Address" />
          <button>
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
