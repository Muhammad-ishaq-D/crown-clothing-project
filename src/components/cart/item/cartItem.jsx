import React from 'react'
import './cartItemStyles.scss'

export default function CartItem({ cartItem }) {
    const { name, quantity, price, imageUrl } = cartItem;
  return (
    <div className='cart-item-container'>
      <img src={imageUrl} alt={`${name}`} className='' />
      <div className='item-details'>
        <span className='name'>{name}</span>
        <span className='price'>{quantity} x ${price}</span>
      </div>
    </div>
  )
}
