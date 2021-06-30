import React, { Fragment, useEffect, useState } from 'react'

function formatPrice(num) {
  return parseFloat(num).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })
}

function getCurrentVariantObject(vars, id) {
  return vars.filter((v) => {
    return v.node.id === id
  })[0]
}

function VariantForm({ vars, current, pick, setQ }) {
  return (
    <form>
      {vars.length > 1 &&
        vars.map((v, index) => {
          return (
            <Fragment key={index}>
              <label>
                <input
                  name="Product Variant"
                  type="radio"
                  id={v.node.id}
                  defaultChecked={index === 0}
                  onChange={() => {
                    pick(v.node.id)
                  }}
                />
                {v.node.title}
              </label>
              <br />
            </Fragment>
          )
        })}
      <input
        type="number"
        placeholder="Quantity"
        defaultValue={1}
        min={1}
        max={getCurrentVariantObject(vars, current).node.quantityAvailable}
        onChange={(e) => {
          setQ(e.target.value)
        }}
      />
    </form>
  )
}

export default function ProductPageContent({ product }) {
  let vars = product.variants.edges

  const [chosenVariant, setChosenVariant] = useState(vars[0].node.id)
  const [quantity, setQuantity] = useState(1)
  const [cost, setCost] = useState('')

  console.log(vars)

  useEffect(() => {
    let variantPrice = getCurrentVariantObject(vars, chosenVariant).node.priceV2
      .amount

    setCost(formatPrice(variantPrice * quantity))
  }, [chosenVariant, quantity, cost])

  let image = product.images.edges[0].node

  return (
    <div className="product-page">
      <div className="product-img">
        <img src={image.src} alt={image.altText} />
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
          <button>Add to Cart</button>
        ) : (
          <button disabled>Out of Stock</button>
        )}
      </div>
    </div>
  )
}
