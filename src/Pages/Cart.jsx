import React, { useState } from 'react';
import { useCart } from '../Context/CartContext';
import { Link } from 'react-router-dom';
import './css/Cart.css';

const Cart = () => {
  const { cartState, dispatch } = useCart();
  const [quantities, setQuantities] = useState({});

  const removeFromCart = (item) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: item });
  };

  const clearCart = () => {
    if (window.confirm('Czy na pewno chcesz wyczyścić koszyk?')) {
      dispatch({ type: 'CLEAR_CART' });
    }
  };


  const handleQuantityChange = (itemId, change) => {
    setQuantities((prevQuantities) => {
      const newQuantity =
        (prevQuantities[itemId] || cartState.items.find((item) => item.id === itemId).quantity) + change;
      if (
        newQuantity >= 1 &&
        newQuantity <= cartState.items.find((item) => item.id === itemId).stock_quantity
      ) {
        return { ...prevQuantities, [itemId]: newQuantity };
      }
      return prevQuantities;
    });
  };

  const brutto_price = cartState.items.reduce((total, item) => parseFloat((total + item.price * (quantities[item.id] || item.quantity)).toFixed(2)), 0)
  const netto_price = (parseFloat(brutto_price / 1.23).toFixed(2))
  const tax_amount = (parseFloat(brutto_price - netto_price).toFixed(2))


  const brutto_PL = new Intl.NumberFormat('pl-PL', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(brutto_price);

  const netto_PL = new Intl.NumberFormat('pl-PL', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(netto_price);

  const tax_PL = new Intl.NumberFormat('pl-PL', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(tax_amount);


  return (
    <div className='cart-page'>
      <h1 className='cart-page-title'>Twój Koszyk: </h1>
      {cartState.items.length === 0 ? (
        <div className='empty-cart'>
          <p>Koszyk jest pusty.</p>
          <Link to='/shop' className='go-back-link'>
            <p>Wróć do sklepu</p>
          </Link>
        </div>
      ) : (
        <div className='full-cart'>
          <table>
            <thead>
              <tr>
                <th className='cart-product-name'> Nazwa produktu</th>
                <th className='cart-product-qty'>Ilość</th>
                <th>Cena jednostkowa</th>
                <th>Cena łączna</th>
                <th>Akcje</th>
              </tr>
            </thead>
            <tbody>

              {cartState.items.map((item) => (
                <tr key={item.id}>
                  <td className='cart-product-name'> <Link to={`../product/${item.id}`} className='product-link' >{item.name}</Link></td>
                  <td className='cart-product-qty'>
                    <span onClick={() => handleQuantityChange(item.id, -1)}>-</span>
                    <input
                      type='number'
                      value={quantities[item.id] || item.quantity}
                      onChange={(e) => {
                        const newQuantity = parseInt(e.target.value, 10);
                        if (!isNaN(newQuantity) && newQuantity >= 1 && newQuantity <= item.stock_quantity) {
                          setQuantities({ ...quantities, [item.id]: newQuantity });
                        }
                      }}
                      onKeyDown={(e) => {
                        const maxQuantity = item.stock_quantity;
                        if (e.key === 'e' || e.key === '.' || e.key === '-' || e.key === '+') {
                          e.preventDefault();
                        } else if (parseInt(e.key, 10) > maxQuantity) {
                          e.preventDefault();
                        }
                      }}
                      min='1'
                      max={item.stock_quantity}
                    />
                    <span onClick={() => handleQuantityChange(item.id, 1)}>+</span>
                  </td>
                  <td className='single-item-price'>{new Intl.NumberFormat('pl-PL', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(parseFloat(item.price))}
                    zł</td>
                  <td className='subtotal-price'>{new Intl.NumberFormat('pl-PL', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(parseFloat(item.price * (quantities[item.id] || item.quantity)))}
                    zł</td>
                  <td className='delate-div'>
                    <span onClick={() => removeFromCart(item)}>x</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='clear-cart-div'>
            <span className='clear-cart-btn' onClick={clearCart}>Wyczyść koszyk</span>
          </div>
          <div className='total-price'>
            <div className='total-price-left'>

            </div>
            <div className='total-price-right'>
              <p>Razem netto: {netto_PL} zł</p>
              <p>VAT 23%: {tax_PL} zł </p>
              <p> Razem brutto: {brutto_PL} zł </p>
            </div>
          </div>
          <div className='proced-to-checkout'>
            <button className='buy-it-btn'>Przejdź do płatności</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
