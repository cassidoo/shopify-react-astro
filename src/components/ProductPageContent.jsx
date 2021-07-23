import React, { useEffect, useState } from 'react';

function formatPrice(num) {
  return parseFloat(num).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
}

function getCurrentVariantObject(vars, id) {
  return vars.filter((v) => {
    return v.node.id === id;
  })[0];
}

function VariantForm({ vars, current, pick, setQ }) {
  return (
    <form className="addToCart">
      {vars.length > 1 &&
        vars.map((v, index) => {
          return (
            <div className="product-page-price" key={`variant${index}`}>
              <label>
                <input
                  name="Product Variant"
                  type="radio"
                  id={v.node.id}
                  defaultChecked={index === 0}
                  onChange={() => {
                    pick(v.node.id);
                  }}
                />
                {` ${v.node.title}`}
              </label>
              <br />
            </div>
          );
        })}
      <input
        type="number"
        placeholder="Quantity"
        defaultValue={1}
        min={1}
        max={getCurrentVariantObject(vars, current).node.quantityAvailable}
        onChange={(e) => {
          setQ(e.target.value);
        }}
      />
    </form>
  );
}

export default function ProductPageContent({ product }) {
  let vars = product.variants.edges;

  // Chosen variant ID
  const [chosenVariant, setChosenVariant] = useState(vars[0].node.id);
  // Quantity of the chosen variant
  const [quantity, setQuantity] = useState(1);
  const [cost, setCost] = useState('');

  useEffect(() => {
    let variantPrice = getCurrentVariantObject(vars, chosenVariant).node.priceV2
      .amount;

    setCost(formatPrice(variantPrice * quantity));
  }, [chosenVariant, quantity, cost]);

  let image = product.images.edges[0].node;

  let handleAddToCart = async () => {
    console.log('--- Adding to cart ---');

    const localCart = window.localStorage.getItem('astroCartId');

    const body = {
      cartId: localCart || '',
      itemId: chosenVariant,
      quantity: quantity,
    };

    const cartResponse = await fetch(
      `${import.meta.env.NETLIFY_URL}/.netlify/functions/add-to-cart`,
      {
        method: 'post',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      }
    );

    const data = await cartResponse.json();
    window.localStorage.setItem('astroCartId', data.id);

    return data;
  };

  return (
    <section className="product-page-content">
      <div>
        <img
          src={image.src}
          alt={image.altText}
          className="product-page-image"
        />
      </div>
      <div className="product-copy">
        <h1>{product.title}</h1>
        <h2>{cost}</h2>
        <p>{product.description}</p>

        <VariantForm
          vars={vars}
          current={chosenVariant}
          pick={setChosenVariant}
          setQ={setQuantity}
        />

        {product.totalInventory > 0 ? (
          <button onClick={handleAddToCart}>Add to Cart</button>
        ) : (
          <button className="disabled" disabled>
            Out of Stock
          </button>
        )}
      </div>
    </section>
  );
}
