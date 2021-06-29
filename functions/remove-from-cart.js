const { removeItemFromCart } = require('./utils/removeItemFromCart')

exports.handler = async (event) => {
  const { cartId, lineId } = JSON.parse(event.body)

  try {
    const shopifyResponse = await removeItemFromCart({
      cartId,
      lineId,
    })

    return {
      statusCode: 200,
      body: JSON.stringify(shopifyResponse.cartLinesRemove.cart),
    }
  } catch (error) {
    console.log('----------------')
    console.log('remove-item-from-cart.js')
    console.log('----------------')
    console.log(error)
  }
}
