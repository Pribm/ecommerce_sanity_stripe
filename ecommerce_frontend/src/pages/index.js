import React from 'react'
import { Footer, FooterBanner, HeroBanner, Product } from '../components'

import { client } from '../lib/client'

const Home = ({products,bannerData}) => {

  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]}/>
      <div className='products-heading'>
        <h2>Best selling products</h2>
        <p>Speakers of many variations</p>
      </div>

      <div className='products-container'>
        {products?.map((product, index) => {
          
          return (
            <React.Fragment key={index}>
              <Product product={product}/>
            </React.Fragment>
          )
        })}
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[0]}/>
    </>
  )
}

//It's like user effect in react, but this flow gets the data at the server side
export const getServerSideProps = async () => {
    const query = '*[_type == "product"]'
    const products = await client.fetch(query)

    const bannerQuery = '*[_type == "banner"]'
    const bannerData = await client.fetch(bannerQuery)

    return {
      props: {products,bannerData}
    }
}

export default Home