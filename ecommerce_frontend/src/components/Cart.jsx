import React, { useRef } from 'react'
import { useStateContext } from '../context/StateContext'

import {AiOutlineDelete, AiOutlineLeft, AiOutlineShopping} from 'react-icons/ai'
import Link from 'next/link'

import {urlFor} from '../lib/client'
import ProductQuantity from './ProductQuantity'
import getStripe from '../lib/getStripe'
import toast from 'react-hot-toast'

const Cart = () => {

  const cartRef = useRef()

  const {totalPrice, cartItems, setShowCart, removeCartItem, toggleCartItemQuantity, seeTotalQuantities} = useStateContext()

  const handleProductQuantity = (item_id) => (value) => toggleCartItemQuantity(item_id, value)

  const handleCheckout = async () => {

    const stripe = await getStripe()

    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(cartItems)
    });

    if(response.statusCode === 500) return;

    const data = await response.json();
    
    toast.loading('Redirecting...');

    stripe.redirectToCheckout({ sessionId: data.id })
  }
 
  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
        type='button'
        className="cart-heading"
        onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft/>
          <span className='heading'>Your Cart</span>
          <span className='cart-num-items'>
            ({
              seeTotalQuantities() + ' items'
            })
          </span>
        </button>

        {
          cartItems.length < 1 && (
            <div className='empty-cart'>
              <AiOutlineShopping size={150}/> 
              <h3>Your Shopping bag is empty</h3>
              <Link href='/'>
                <button
                type='button'
                onClick={() => setShowCart(false)}
                className='btn'
                >
                  Continue Shopping
                </button>
              </Link>
            </div>
          )
        }

        <div className='product-container'>
          {cartItems.length >= 1 && cartItems.map((cartItem) => {
            return (
              <div className='product' key={cartItem?._id+'_cart'}>
                <img src={urlFor(cartItem.image[0])} className='cart-product-image'/>
                <div className='item-desc'>
                  <div className='flex top'>
                    <h5>{cartItem?.name}</h5>
                    <h4>$ {cartItem?.price}</h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                      <div className="quantity-desc">
                        <ProductQuantity handleProductQuantity={handleProductQuantity(cartItem._id)} productQuantity={cartItem.quantity}/>
                      </div>
                    </div>
                    <button
                      type='button'
                      className='remove-item'
                      onClick={() => removeCartItem(cartItem)}
                    >
                      <AiOutlineDelete/>
                    </button>
                   
                  </div>
                </div>
              </div>
            )
          })}

          <div>
            {cartItems.length >= 1 && (
              <div className='cart-bottom'>
                <div className="total">
                  <h3>Subtotal: </h3>
                  <h3>$ {totalPrice.toFixed(2)}</h3>
                </div>
                <div className='btn-container'>
                  <button
                    type="button"
                    className='btn'
                    onClick={() => handleCheckout()}
                  >
                    Pay with Stripe
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart