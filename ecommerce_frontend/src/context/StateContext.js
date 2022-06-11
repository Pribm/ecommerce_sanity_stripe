import React, { createContext, useContext, useState} from 'react'
import { toast } from 'react-hot-toast'

const Context = createContext()

export const StateContext = ({children}) => {
    const [showCart, setShowCart] = useState(false)
    const [cartItems, setcartItems] = useState([])
    const [totalPrice, settotalPrice] = useState(0)
    const [qty, setqty] = useState(1)

    

    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find(item => item._id === product._id);

        settotalPrice(totalPrice => parseFloat(totalPrice + (product.price * quantity)))
        
        if(checkProductInCart && typeof checkProductInCart !== 'undefined'){
        
            const updatedCartItems = cartItems.map((cartProduct) => {
                if(cartProduct._id === product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }
            })

            setcartItems(updatedCartItems)
        }else{
            product.quantity = quantity;    
            setcartItems([...cartItems, {...product}])
        }

        toast.success(`${qty} ${product.name} added to the cart.`)
    }

    const toggleCartItemQuantity = (id, value) => {

        let updatedProduct = cartItems.filter(item => item._id === id)
        
        let newPrice = 0;

        let newCartItems = cartItems.map(cart_item => {
            if(cart_item._id === id){
                if(value === 'inc'){
                    cart_item.quantity++
                }
                else if(value === 'dec'){
                    if(cart_item.quantity <= 1){
                        cart_item.quantity = 1
                    }else{
                        cart_item.quantity--
                    }
                } 
            }
            newPrice += cart_item.quantity * cart_item.price
            settotalPrice(newPrice)

            return cart_item
        })

       if(value === 'inc'){
            setcartItems(newCartItems)

        }else if(value === 'dec'){
            setcartItems(newCartItems)
        }
        
    }

    const seeTotalQuantities = (totalQuantities = 0) => {
        cartItems.map(item => totalQuantities += parseInt(item.quantity))
        return totalQuantities
    }

    const increaseQty = () => {
        setqty(qty => parseInt(qty+1))
    }

    const decreaseQty = () => {
        setqty(qty => {
            if((qty-1) <= 1) return qty = parseInt(1); 
            return qty-1
        })
    }

    const removeCartItem = item => {
        settotalPrice(totalPrice => totalPrice - (item.price * item.quantity))
        setcartItems(cartItems => cartItems.filter(cartItem => cartItem !== item))
    }

    /**Here will be all the states of out Context Provider */
    return (
        <Context.Provider value={{
            showCart,
            setShowCart,
            cartItems,
            setcartItems,
            totalPrice,
            settotalPrice,
            setqty,
            qty,
            increaseQty,
            decreaseQty,
            onAdd,
            toggleCartItemQuantity,
            removeCartItem,
            seeTotalQuantities
        }}>
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context)