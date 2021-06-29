/**
 * API endpoint for getting a specific product info
 */

const { postToShopify } = require('./utils/postToShopify')

exports.handler = async (event) => {
  const { itemHandle } = JSON.parse(event.body)

  const shopifyResponse = await postToShopify({
    query: `
      query getProduct($handle: String!) {
        productByHandle(handle: $handle) {
          id
          handle
          description
          title
          totalInventory
          variants(first: 5) {
            edges {
              node {
                id
                title
                quantityAvailable
                priceV2 {
                  amount
                  currencyCode
                }
              }
            }
          }
          priceRange {
            maxVariantPrice {
              amount
              currencyCode
            }
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 1) {
            edges {
              node {
                src
                altText
              }
            }
          }
        }
      }
    `,
    variables: {
      handle: itemHandle,
    },
  })

  return {
    statusCode: 200,
    body: JSON.stringify(shopifyResponse),
  }
}
