import React from 'react';

export default function ProductListing({ product }) {
  let image = product.images.edges[0].node;
  return (
    <li className="product-card">
      <div className="product-card-frame">
        <img className="prodimg" src={image.src} alt={image.altText} />
      </div>
      <div className="product-card-text">
        <h3 className="product-card-title">{product.title}</h3>
        <p className="product-card-description">
          {product.description.substring(0, 60)}...
        </p>
      </div>
      <a href={`/product/${product.handle}`}>
        <button>View Item {`>`}</button>
      </a>
    </li>
  );
}
