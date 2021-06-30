import React from 'react'

function formatPrice(num) {
  return parseFloat(num).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })
}

export default function ProductPageContent({ product }) {
  let image = product.images.edges[0].node

  console.log(product)

  return (
    <div className="product-page">
      <div className="product-img">
        <img src={image.src} alt={image.altText} />
      </div>
      <div className="product-copy">
        <h1>{product.title}</h1>
        <h2>{formatPrice(product.priceRange.minVariantPrice.amount)}</h2>
        <p>{product.description}</p>
        <button>Add to Cart</button>
      </div>
    </div>
  )
}
