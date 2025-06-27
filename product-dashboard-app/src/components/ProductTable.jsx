import React from 'react';
import ProductRow from './ProductRow';

const ProductTable = ({ products, onUpdateTitle, onUpdatePrice, onDelete }) => {
  return (
    <table border="1" cellPadding="10">
      <thead>
        <tr>
          <th>Title</th>
          <th>Brand</th>
          <th>Category</th>
          <th>Price</th>
          <th>Rating</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {products.map((prod) => (
          <ProductRow
            key={prod.id}
            product={prod}
            onUpdateTitle={onUpdateTitle}
            onUpdatePrice={onUpdatePrice}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
