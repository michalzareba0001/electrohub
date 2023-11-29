import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './css/Shop.css';
import BanerBig from '../Components/BanerBig/BanerBig';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
  });

  useEffect(() => {
    // Pobierz listę produktów
    axios
      .get('https://wootest.scharmach.pl/wp-json/wc/v3/products', {
        params: {
          consumer_key: 'ck_f1bc574fd9537976604327a5769e97a0b7e19095',
          consumer_secret: 'cs_1115df5a1163d050660f304b57c109d9af96b3e3',
          verify_ssl: false,
          per_page: 100,
        },
      })
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });

    // Pobierz listę kategorii
    axios
      .get('https://wootest.scharmach.pl/wp-json/wc/v3/products/categories', {
        params: {
          consumer_key: 'ck_f1bc574fd9537976604327a5769e97a0b7e19095',
          consumer_secret: 'cs_1115df5a1163d050660f304b57c109d9af96b3e3',
          verify_ssl: false,
        },
      })
      .then((response) => {
        // Filtrowanie kategorii, aby zawierały co najmniej jeden produkt
        const categoriesWithProducts = response.data.filter((category) =>
          products.some((product) => product.categories.some((cat) => cat.id === category.id))
        );

        setCategories(categoriesWithProducts);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [products]);

  // Funkcja do filtrowania produktów
  const filterProducts = () => {
    let filtered = [...products];

    if (filters.category) {
      filtered = filtered.filter((product) =>
        product.categories.some((cat) => cat.slug === filters.category)
      );
    }

    if (filters.minPrice) {
      filtered = filtered.filter(
        (product) => parseFloat(product.price) >= parseFloat(filters.minPrice)
      );
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(
        (product) => parseFloat(product.price) <= parseFloat(filters.maxPrice)
      );
    }

    return filtered;
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className='shop'>
      <BanerBig currentIndex={0} />
      <div className='shop-grid'>
        <div className='shop-left'>
          <h2>Kategorie</h2>
          <ul>
            <li key='all'>
              <span className='category-link' onClick={() => setFilters({ ...filters, category: '' })}>
                Wszystkie
              </span>
            </li>
            {categories.map((category) => (
              <li key={category.id}>
                <span
                  className='category-link'
                  onClick={() => setFilters({ ...filters, category: category.slug })}
                >
                  {category.name}
                </span>
              </li>
            ))}
          </ul>
          <h2>Cena:</h2>
          <div className='cena-container'>
            <div className='cena-group'>
              <label htmlFor='minPrice'>min. </label>
              <input
                id='minPrice'
                type='number'
                placeholder=''
                value={filters.minPrice}
                onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
              />
            </div>
            <div className='cena-group'>
              <label htmlFor='maxPrice'>max. </label>
              <input
                id='maxPrice'
                type='number'
                placeholder=''
                value={filters.maxPrice}
                onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
              />
            </div>
          </div>
        </div>
        <div className='shop-right'>
          <div className='products-grid'>
            {filterProducts().map((product) => (
              <Link to={`../product/${product.id}`} className='product-link' key={product.id}>
                <div className='product'>
                  <h2 className='product-name'>{product.name}</h2>
                  <div className='img-div'>
                    {product.on_sale ? <div className='promo-icon'>%</div> : <></>}
                    <img src={product.images[0].src} alt='product' className='product-img' />
                  </div>
                  <p className='product-price'>
                    Cena:
                    {product.on_sale ? (
                      <>
                        <span className='regular-price'>{product.regular_price} zł</span>
                        <span className='sale-price'>{product.sale_price} zł</span>
                      </>
                    ) : (
                      <span>{product.price} zł</span>
                    )}
                  </p>
                  <p className='product-category'>
                    Kategoria:
                    {product.categories.map((category) => (
                      <span key={category.id}> {category.name}</span>
                    ))}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
