import React from 'react'

export default function ProductListing({ product }) {
  let image = product.images.edges[0].node
  return (
    <li className="product">
      <div className="frame">
        <img className="prodimg" src={image.src} alt={image.altText} />
      </div>
      <h2>{product.title}</h2>
      <p>{product.description.substring(0, 60)}...</p>
    </li>
  )
}
