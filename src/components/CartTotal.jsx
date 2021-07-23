import React from 'react';
import { formatPriceWithDefault } from '../utilityFunctions';

export default function CartTotal({ cost }) {
  let subtotal, tax, total;

  subtotal = formatPriceWithDefault(
    cost?.subtotalAmount?.amount,
    cost?.subtotalAmount?.currency
  );
  tax = formatPriceWithDefault(
    cost?.totalTaxAmount,
    cost?.totalTaxAmount?.currency
  );
  total = formatPriceWithDefault(
    cost?.totalAmount?.amount,
    cost?.totalAmount?.currency
  );

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
