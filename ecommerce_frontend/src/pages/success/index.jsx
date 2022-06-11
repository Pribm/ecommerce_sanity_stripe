import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import {BsBagCheckFill} from 'react-icons/bs'
import {useRouter} from 'next/router'
import { useStateContext } from '../../context/StateContext'
import { runFireWorks } from '../../lib/utils'

const Success = () => {

  const {setcartItems, settotalPrice, seeTotalQuantities} = useStateContext()

  useEffect(() => {
    localStorage.clear()
    setcartItems([])
    settotalPrice(0)
    seeTotalQuantities(0),
    runFireWorks()
  }, [])

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill/>
        </p>
        <h2>Thank you for the purchase!</h2>
        <p className='email-msg'>Check your email inbox for the receipt.</p>
        <p className='description'>
          If you have any questions, plese email
          <a className='email' href="mailto:order@example.com">
            order@example.com
          </a>
        </p>
        <Link href='/'>
          <button type='button' className='btn'>
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Success