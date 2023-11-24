import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './css/Product.css';

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isButtonActive, setIsButtonActive] = useState(false);

  useEffect(() => {
    axios.get(`https://wootest.scharmach.pl/wp-json/wc/v3/products/${id}`, {
      params: {
        consumer_key: 'ck_f1bc574fd9537976604327a5769e97a0b7e19095',
        consumer_secret: 'cs_1115df5a1163d050660f304b57c109d9af96b3e3',
        verify_ssl: false,
      }
    })
      .then(response => {
        setProduct(response.data);
        setIsButtonActive(response.data?.type === 'external');
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

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
        <h1 className='product-name'>{product.name}</h1>
        <h2 className='product-category'>Kategoria: {product.categories.map(category => (
          <span key={category.id}>
            {category.name}</span>
        ))}</h2>
        <p className='product-sku'>SKU: {product.sku}</p>
        <p className='product-qty'>Ilość w magzynie: {product.stock_quantity} szt</p>
        <p className='product-price'>Cena: {product.price} zł</p>
        <hr />
        <p className='product-description'>Opis: <span dangerouslySetInnerHTML={{ __html: product.description }}></span></p>
        <hr />
        
      </div>
    </div>
  );
}

export default Product;
