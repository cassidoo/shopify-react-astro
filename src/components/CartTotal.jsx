import React from 'react';

function formatPrice(num, currency) {
  if (num === null) {
    return '$0.00';
  }
  return parseFloat(num).toLocaleString('en-US', {
    style: 'currency',
    currency: currency || 'USD',
  });
}

export default function CartTotal({ cost }) {
  let subtotal, tax, total;

  subtotal = formatPrice(
    cost?.subtotalAmount?.amount,
    cost?.subtotalAmount?.currency
  );
  tax = formatPrice(cost?.totalTaxAmount, cost?.totalTaxAmount?.currency);
  total = formatPrice(cost?.totalAmount?.amount, cost?.totalAmount?.currency);

  return (
    <section className="cart-total">
      <div className="cart-total-content">
        <div className="cart-total-column">
          <p>
            <strong>Subtotal:</strong>
          </p>
          <p>Shipping:</p>
          <p>Tax:</p>
          <p>Total:</p>
        </div>
        <div className="cart-total-column">
          <p>
            <strong>{subtotal}</strong>
          </p>
          <p>Free Shipping</p>
          <p>{tax}</p>
          <p>{total}</p>
        </div>
      </div>
    </section>
  );
}
