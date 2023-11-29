import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Promocje.css';

const Promocje = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://wootest.scharmach.pl/wp-json/wc/v3/products', {
      params: {
        consumer_key: 'ck_f1bc574fd9537976604327a5769e97a0b7e19095',
        consumer_secret: 'cs_1115df5a1163d050660f304b57c109d9af96b3e3',
        verify_ssl: false,
        per_page: 100,
      },
    })
      .then(response => {
        // Filtruj tylko produkty w promocji
        const promotionProducts = response.data.filter(product =>
          product.on_sale
        );

        setProducts(promotionProducts);
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
    <div className='promocje'>
      <h2>Promocje</h2>
      <div className='products-grid'>
        {products.map(product => (
          <Link to={`product/${product.id}`} className='product-link' key={product.id}>
            <div className='product'>
              <h3 className='product-name'>{product.name}</h3>
              <div className='img-div'>
                <img src={product.images[0].src} alt='product' className='product-img' />
              </div>
              <p className='product-regular-price'>
                Cena standardowa: {product.regular_price} zł
              </p>
              <p className='product-sale-price'>
                Cena promocyjna: <span>{product.sale_price} zł</span>
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

export default Promocje;
