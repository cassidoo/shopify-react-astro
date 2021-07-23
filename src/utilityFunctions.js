export function formatPrice(num, currency) {
  return parseFloat(num).toLocaleString('en-US', {
    style: 'currency',
    currency: currency || 'USD',
  });
}

export function formatPriceWithDefault(num, currency) {
  if (num === null) {
    return '$0.00';
  }
  return parseFloat(num).toLocaleString('en-US', {
    style: 'currency',
    currency: currency || 'USD',
  });
}

export function itemTotal(price, quantity) {
  const totalPrice = parseFloat(price.amount) * parseInt(quantity);

  return formatPrice(totalPrice, price.currencyCode);
}

export default { formatPrice, itemTotal };
