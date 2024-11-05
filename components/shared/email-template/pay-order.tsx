import * as React from 'react';

interface PayOrderProps {
  orderId: string,
  paymentUrl: string,
  totalAmount: number,
}

export const PayOrder: React.FC<PayOrderProps> = ({
  orderId, paymentUrl, totalAmount
}) => (
  <div>
    <h1>Order number, {orderId}!</h1>
    <p>
      Pay of the order in the amount of <b>{totalAmount}</b>. Follow <a href={paymentUrl}>this link</a> to pay for the order.
    </p>
  </div>
);