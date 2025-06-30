import React, { useContext } from 'react';
import { useNavigate } from 'react-router'
import Button from '../../button/buttonComp';
import CartItem from '../item/cartItem';
import { CartContext } from '../../../context/cartContext';
import { CartDropdownContainer, CartItems, EmptyMessage } from './dropdownStyles.jsx';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../../../store/cart/cartSelector.js';

export default function CartDropdown() {
  // const { cartItems } = useContext(CartContext);
  const cartItems = useSelector(selectCartItems)
  const navigate  = useNavigate();
  
 const goToCheckout = () => {
   navigate('/checkout')
 };

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => (
            <CartItem key={item.id} cartItem={item} />
          ))
        ) : (
          <EmptyMessage>Cart is empty</EmptyMessage>
        )}
      </CartItems>
       <Button onClick={goToCheckout}>GO TO CHECKOUT</Button>
    </CartDropdownContainer>
  );
}
