/**
 * API endpoint to get items from an existing cart
 *
 * EXAMPLE:
 *
 * Get existing cart
 *```
 * fetch('/.netlify/functions/add-to-cart', {
 *   method: 'POST',
 *   body: JSON.stringify({
 *     cartId: 123
 *   })
 * })
 * ```
 */

const { postToShopify } = require('./utils/postToShopify')

exports.handler = async (event) => {
  const { cartId } = JSON.parse(event.body)

  try {
    const shopifyResponse = await postToShopify({
      query: `
        query getCart($cartId: ID!) {
          cart(id: $cartId) {
            id
            lines(first: 10) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                    }
                  }
                }
              }
            }
            estimatedCost {
              totalAmount {
                amount
                currencyCode
              }
              subtotalAmount {
                amount
                currencyCode
              }
              totalTaxAmount {
                amount
                currencyCode
              }
              totalDutyAmount {
                amount
                currencyCode
              }
            }
          }
        }
      `,
      variables: {
        cartId,
      },
    })

    return {
      statusCode: 200,
      body: JSON.stringify(shopifyResponse),
    }
  } catch (error) {
    console.log(error)
  }
}
