import React from 'react'
import { AiFillInstagram, AiOutlineTwitter} from 'react-icons/ai'

const footer = () => {
  return (
    <div className="footer-container">
      <p>2022 JSM HeadPhones All rights reserved</p>
      <p className="icons">
        <AiFillInstagram/>
        <AiOutlineTwitter/>
      </p>
    </div>
  )
}

export default footer