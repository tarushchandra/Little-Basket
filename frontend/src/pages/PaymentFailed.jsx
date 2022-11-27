import React from "react";

const PaymentFailed = () => {
  return (
    <div className="payment-failed">
      <div>
        <i class="fa-solid fa-circle-xmark"></i>
        <h1>Transaction Failed</h1>
      </div>
      <p>Redirecting to Homepage...</p>
    </div>
  );
};

export default PaymentFailed;
