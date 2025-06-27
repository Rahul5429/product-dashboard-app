import React, { useState } from 'react';

const ProductRow = ({ product, onUpdateTitle, onUpdatePrice, onDelete }) => {
  const [titleEditMode, setTitleEditMode] = useState(false);
  const [priceEditMode, setPriceEditMode] = useState(false);
  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);

  const handleTitleBlur = () => {
    setTitleEditMode(false);
    if (title !== product.title) onUpdateTitle(product.id, title);
  };

  const handlePriceBlur = () => {
    setPriceEditMode(false);
    if (price !== product.price) onUpdatePrice(product.id, price);
  };

  return (
    <tr>
      <td>
        {titleEditMode ? (
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleTitleBlur}
            autoFocus
          />
        ) : (
          <span onClick={() => setTitleEditMode(true)}>{title}</span>
        )}
      </td>

      <td>{product.brand}</td>
      <td>{product.category}</td>

      <td>
        {priceEditMode ? (
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            onBlur={handlePriceBlur}
            autoFocus
          />
        ) : (
          <>
            ${price}
            <button
              onClick={() => setPriceEditMode(true)}
              style={{ marginLeft: '8px' }}
              title="Edit Price"
            >
              ✏️
            </button>
          </>
        )}
      </td>

      <td>{product.rating}</td>
      <td>
        <button onClick={() => onDelete(product.id)} title="Delete">
          🗑
        </button>
      </td>
    </tr>
  );
};

export default ProductRow;
