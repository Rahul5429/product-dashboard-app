import React, { useEffect, useState } from 'react';
import {
  fetchProducts,
  updateProductTitle,
  updateProductPrice,
  deleteProduct,
} from '../data/mockApi';
import ProductTable from '../components/ProductTable';
import FilterDropdown from '../components/FilterDropdown';

const Home = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [ratingRange, setRatingRange] = useState('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const priceRanges = [
    '0-10',
    '10-20',
    '20-30',
    '30-50',
    '50-100',
    '100-150',
  ];

  const ratingRanges = ['0-1', '1-2', '2-3', '3-4', '4-5'];

  const applyFilters = () => {
    let data = [...allProducts];

    if (brand) data = data.filter((p) => p.brand === brand);
    if (category) data = data.filter((p) => p.category === category);

    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      data = data.filter((p) => p.price >= min && p.price <= max);
    }

    if (ratingRange) {
      const [min, max] = ratingRange.split('-').map(Number);
      data = data.filter((p) => p.rating >= min && p.rating <= max);
    }

    setFiltered(data);
  };

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setAllProducts(data);
        setFiltered(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Error fetching data');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    applyFilters();
  }, [brand, category, priceRange, ratingRange, allProducts]);

  const brands = [...new Set(allProducts.map((p) => p.brand))];
  const categories = [...new Set(allProducts.map((p) => p.category))];

  const resetFilters = () => {
    setBrand('');
    setCategory('');
    setPriceRange('');
    setRatingRange('');
  };

  const handleUpdateTitle = (id, newTitle) => {
    updateProductTitle(id, newTitle).then(setAllProducts);
  };

  const handleUpdatePrice = (id, newPrice) => {
    updateProductPrice(id, newPrice).then(setAllProducts);
  };

  const handleDelete = (id) => {
    deleteProduct(id).then(setAllProducts);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>🛒 Product Dashboard</h1>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <FilterDropdown label="Brand" options={brands} value={brand} onChange={setBrand} />
        <FilterDropdown label="Category" options={categories} value={category} onChange={setCategory} />
        <FilterDropdown label="Price" options={priceRanges} value={priceRange} onChange={setPriceRange} />
        <FilterDropdown label="Rating" options={ratingRanges} value={ratingRange} onChange={setRatingRange} />
        <button onClick={resetFilters}>Reset Filters</button>
      </div>

      {filtered.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <ProductTable
          products={filtered}
          onUpdateTitle={handleUpdateTitle}
          onUpdatePrice={handleUpdatePrice}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Home;
