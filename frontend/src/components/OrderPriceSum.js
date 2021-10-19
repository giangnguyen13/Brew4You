import React from "react";

const OrderPriceSum = ({ text, amount }) => {
  return (
    <div
      className='order_total offset-md-8'
      style={{ maxWidth: "fit-content" }}
    >
      <div className='order_total_content text-md-right'>
        <div className='order_total_title'>{text}</div>
        <div className='order_total_amount'>{`$ ${amount}`}</div>
      </div>
    </div>
  );
};

export default OrderPriceSum;
