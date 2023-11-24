import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Nowosci.css';

const Nowosci = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://wootest.scharmach.pl/wp-json/wc/v3/products', {
      params: {
        consumer_key: 'ck_f1bc574fd9537976604327a5769e97a0b7e19095',
        consumer_secret: 'cs_1115df5a1163d050660f304b57c109d9af96b3e3',
        verify_ssl: false,
        per_page: 100
      }
    })
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className='nowosci'>
      <h2>Nowości</h2>
      <div className='products-grid'>
        {products.map(product => (
          <Link to={`product/${product.id}`} className='product-link' key={product.id}>
            <div className='product'>
              <h2 className='product-name'>{product.name}</h2>
                <div className='img-div'>
              <img src={product.images[0].src} alt='product' className='product-img' />
              </div>
              <p className='product-price'>
                Cena: {product.price} zł
              </p>
              <p className='product-category'>
                Kategoria:
                {product.categories.map(category => (
                  <span key={category.id}> {category.name}</span>
                ))}
              </p>
              <p className='short-description' dangerouslySetInnerHTML={{ __html: product.short_description }}></p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Nowosci;
