/**
 * API Endpoint
 *
 * Purpose: Fetch first 100 products of the store
 *
 * Example:
 * ```
 * fetch('/.netlify/functions/get-product-list', {
 *   method: 'POST'
 * })
 * ```
 *
 * ! POST method is intentional for future enhancement
 *
 * TODO: Add enhancement for pagination
 */

const { postToShopify } = require('./utils/postToShopify');

exports.handler = async () => {
  try {
    console.log('--------------------------------');
    console.log('Retrieving product list...');
    console.log('--------------------------------');
    const shopifyResponse = await postToShopify({
      query: `
        query getProductList {
          products(sortKey: TITLE, first: 100) {
            edges {
              node {
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
          }
        }
      `,
    });

    return {
      statusCode: 200,
      body: JSON.stringify(shopifyResponse),
    };
  } catch (error) {
    console.log(error);
  }
};
