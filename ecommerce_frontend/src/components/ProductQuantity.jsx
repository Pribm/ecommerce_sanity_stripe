import React from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai' 

const ProductQuantity = ({handleProductQuantity, productQuantity, item_id}) => {

    return (
        <p className="quantity-desc">
            <span className="minus" onClick={() => handleProductQuantity('dec', item_id)}>
                <AiOutlineMinus />
            </span>
            <span className="num">
                {productQuantity}
            </span>
            <span className="plus" onClick={() => handleProductQuantity('inc', item_id) }>
                <AiOutlinePlus />
            </span>
        </p>
    )
}

export default ProductQuantity