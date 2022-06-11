import React from 'react'
import Link from 'next/link'

import { AiOutlineShopping } from 'react-icons/ai'
import { useStateContext } from '../context/StateContext'
import Cart from './Cart'

const Navbar = () => {

  const {showCart, setShowCart, seeTotalQuantities} = useStateContext()

  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href='/'>JSM HeadPhones</Link>
      </p>

      <button type='button' className='cart-icon' onClick={() => setShowCart(!showCart)}>
        <AiOutlineShopping/>
        <span className='cart-item-qty'>{seeTotalQuantities()}</span>
      </button>

      {
        showCart &&
        <Cart/>
      }
    </div>
  )
}

export default Navbar