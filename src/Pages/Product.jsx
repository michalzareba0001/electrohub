// Importuj addToCart z useCart, a nie osobno
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../Context/CartContext'; 

import './css/Product.css';

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { dispatch } = useCart();

  useEffect(() => {
    axios
      .get(`https://wootest.scharmach.pl/wp-json/wc/v3/products/${id}`, {
        params: {
          consumer_key: 'ck_f1bc574fd9537976604327a5769e97a0b7e19095',
          consumer_secret: 'cs_1115df5a1163d050660f304b57c109d9af96b3e3',
          verify_ssl: false,
        },
      })
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch({ type: 'ADD_TO_CART', payload: product });
      alert('Produkt dodany do koszyka!');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className='product-page'>
      <div className='product-left'>
        <div className='product-images'>
          {product.images && product.images.length > 0 && (
            product.images.map(image => (
              <img key={image.id} src={image.src} alt={`product-${image.id}`} className='product-img' />
            ))
          )}
        </div>
      </div>
      <div className='product-right'>
        <h1 className='product-name'>{product.name}
          {product.on_sale ? (
            <div className='promo-icon'>
              %
            </div>
          ) :
            (<></>)}
        </h1>
        <h2 className='product-category'>Kategoria: {product.categories.map(category => (
          <span key={category.id}>
            {category.name}</span>
        ))}</h2>
        <p className='product-sku'>SKU: {product.sku}</p>
        <p className='product-qty'>Ilość w magzynie: {product.stock_quantity} szt</p>
        <p className='product-price'>
          Cena:
          {product.on_sale ? (
            <>
              <span className='regular-price'> {product.regular_price} zł</span>
              <span className='sale-price'> {product.sale_price} zł</span>
            </>
          ) : (
            <span> {product.price} zł</span>
          )}
        </p>
        <hr />
        <p className='product-description'>Opis: <span dangerouslySetInnerHTML={{ __html: product.description }}></span></p>
        <hr />
        
        {/* Przycisk "Dodaj do koszyka" */}
        <button onClick={handleAddToCart}>Dodaj do koszyka</button>
      </div>
    </div>
  );
}

export default Product;
