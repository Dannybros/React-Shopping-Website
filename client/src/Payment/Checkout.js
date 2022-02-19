import React from 'react'
import CartList from '../Cart/CartList';
import "./Checkout.css";
import Subtotal from './Subtotal';
import { useStateValue } from '../Reducer_axios/StateProvider';

function Checkout() {
    const [{cart}] = useStateValue();
    const customer=JSON.parse(localStorage.getItem('profile'));
    return (    
        <div className="checkout">
            <div className="checkout__left"> 
                <h3>{customer?.result.name}</h3>
                <h2 className="checkout__title">
                    Your Shopping Basket
                </h2>
                <div>
                    {cart.map(i =>(
                        <CartList 
                            id = {i.id}
                            title={i.title}
                            price = {i.price}
                            rating = {i.rating}
                            image={i.image}
                            category = {i.category}
                        />
                    ))}
                </div>
                
            </div>
            <div className="checkout__right">
                <Subtotal />
            </div>
        </div>
    )
}

export default Checkout
