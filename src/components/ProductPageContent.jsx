import React from 'react'

export default function ProductPageContent({ product }) {
  let image = product.images.edges[0].node

  return (
    <div className="product-page">
      <div className="product-img">
        <img src={image.src} alt={image.altText} />
      </div>
      <div className="product-copy">
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <button>Add to Cart</button>
      </div>
    </div>
  )
}
