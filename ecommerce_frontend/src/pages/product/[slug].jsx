import React, {useEffect, useState} from 'react'

import { client, urlFor } from '../../lib/client'

import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { Product } from '../../components'

import { useStateContext } from '../../context/StateContext'
import ProductQuantity from '../../components/ProductQuantity'


const ProductDetails = ({ products, product }) => {

  const [index, setIndex] = useState(0)
  const { qty, onAdd, increaseQty, decreaseQty, setShowCart} = useStateContext()

  const { image, name, details, price } = product

  const handleProductQuantity = (value) => {
    if(value === 'inc'){
      increaseQty()
      return
    }
    decreaseQty()
  }

  const handleBuyNow = () => {
    onAdd(product, 1)
    setShowCart(true)
  }

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className='image-container'>
            <img src={urlFor(image && image[index])} alt={name} className="product-detail-image"/>
          </div>
          <div className='small-images-container'>
              {image?.map((item, key) => (
                <img
                  src={urlFor(item)}
                  key={key}
                  className={key === index ? 'small-image selected-image' : 'small-image'}
                  onMouseEnter={() => setIndex(key)}
                />
              ))}
            </div>

          <div className="product-detail-desc">
            <h1>{name}</h1>
            <div className='reviews'>
              <div>
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiOutlineStar />
              </div>
              <p>20</p>
            </div>
                
            <h4>Details:</h4>
            <p>{details}</p>
            <p className="price">${price}</p>
            <div className="quantity">
              <h3>Quantity:</h3>
              <ProductQuantity handleProductQuantity={handleProductQuantity} productQuantity={qty}/>
            </div>
            <div className="buttons">
              <button type='button' className='add-to-cart' onClick={() => onAdd(product, qty)}>
                Add to Cart
              </button>
              <button type='button' className='buy-now' onClick={() => handleBuyNow()}>
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
            <h2>You May Also Like</h2>
            <div className="marquee">
              <div className="maylike-products-container track">
                {
                  products.map((item) => (
                    <Product key={item._id} product={item} />
                  ))
                }
              </div>
            </div>
          </div>

    </div>
  )
}

//This get the possible paths that can be rendered in this page
export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }`;

  const products = await client.fetch(query)

  const paths = products.map(product => ({
    params: {
      slug: product.slug.current
    }
  }))

  //if fallback blocking is used, the static paths are called before the initial render
  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps = async ({ params: {
  slug,
} }) => {
  const query = `*[_type == "product" && slug.current == "${slug}"][0]`
  const productsQuery = `*[_type == "product"]`

  const product = await client.fetch(query)
  const products = await client.fetch(productsQuery)


  return {
    props: { products, product }
  }
}

export default ProductDetails