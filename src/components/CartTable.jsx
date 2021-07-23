import React from 'react';
import { formatPrice, itemTotal } from '../utilityFunctions';

export default function CartTable({ cartItems, cartId, removeItem }) {
  let removeItemFromCart = (itemId) => {
    fetch(
      `${import.meta.env.NETLIFY_URL}/.netlify/functions/remove-from-cart`,
      {
        method: 'POST',
        body: JSON.stringify({
          cartId: cartId,
          lineId: itemId,
        }),
      }
    )
      .then((response) => response.json())
      .then((response) => {
        console.log('--- Item deleted ---');

        removeItem(response.lines.edges);
        return response;
      });
  };

  return (
    <table className="cart-table">
      <thead>
        <tr>
          <th className="cart-table-heading">Item</th>
          <th className="cart-table-heading">Price</th>
          <th className="cart-table-heading">Quantity</th>
          <th className="cart-table-heading">Total</th>
          <th className="cart-table-heading">Actions</th>
        </tr>
      </thead>
      <tbody>
        {cartItems.map((item, index) => {
          item = item.node;

          let merchandiseTitle =
            item.merchandise.title === 'Default Title'
              ? ''
              : `(${item.merchandise.title})`;
          return (
            <tr className="cart-table-row" key={`cartItem${index}`}>
              <td className="cart-table-cell">
                {item.merchandise.product.title} {merchandiseTitle}
              </td>
              <td className="cart-table-cell">
                {formatPrice(
                  item.merchandise.priceV2.amount,
                  item.merchandise.priceV2.currencyCode
                )}
              </td>
              <td className="cart-table-cell">{item.quantity}</td>
              <td className="cart-table-cell">
                {itemTotal(item.merchandise.priceV2, item.quantity)}
              </td>
              <td className="cart-table-cell">
                <button
                  onClick={() => {
                    removeItemFromCart(item.id);
                  }}
                >
                  Remove Item
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
