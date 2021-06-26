import fetch from 'node-fetch'

const shopUrl = 'https://netlify-demo.myshopify.com'
const storefrontAcessToken = 'b98313b8d60c1d61649070cc78cc41da' // Safe to share. This is read-only. Not secret.

async function pullData() {
  // Assemble the graphql query to fetch info all products

  const query = `{
      products(sortKey: TITLE, first: 100) {
        edges {
          node {
            id
            handle
            description
            title
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
    }`

  try {
    const response = await fetch(shopUrl + `/api/graphql`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/graphql',
        'X-Shopify-Storefront-Access-Token': storefrontAcessToken,
      },
      body: query,
    })
      .then((res) => res.json())
      .then((response) => {
        return response.data.products.edges
      })

    return {
      statusCode: 200,
      body: response,
    }
  } catch (error) {
    console.error(error)
  }
}

export default pullData
