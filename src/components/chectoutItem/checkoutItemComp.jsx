import React, { useContext } from 'react'
import './checkoutItemStyles.scss'
import { CartContext } from '../../context/cartContext';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, clearItemFromCart, removeItemFromCart } from '../../store/cart/cartAction';
import { selectCartItems } from '../../store/cart/cartSelector';

export default function CheckoutItem({ cartItem }) {
    const { name, imageUrl, price, quantity } = cartItem;
    // const { clearItemFromCart, addItemToCart, removeItemToCart } = useContext(CartContext);
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems)
    const clearItemHandler = () => dispatch(clearItemFromCart(cartItems, cartItem));
    const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem))
    const removeItemHandler = () => dispatch(removeItemFromCart(cartItems, cartItem))

  return (
    <div className='checkout-item-container'>
        <div className='image-container'>
            <img src={imageUrl} alt={`${name}`} />
        </div>
        <span className='name'> {name} </span>
        <span className='quantity'>
        <div className='arrow' onClick={removeItemHandler}>
          &#10094;
        </div>
        <span className='value'>{quantity}</span>
        <div className='arrow' onClick={addItemHandler}>
          &#10095;
        </div>
      </span>
        <span className='value'> ${price} </span>
        <div className='remove-button' onClick={clearItemHandler}>&#10005;</div>  
    </div>
  )
}
