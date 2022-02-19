import React from 'react';
import "./CartList.css";
import { useStateValue } from '../Reducer_axios/StateProvider';

function CartList({id, image, title, price, rating, category}) {

    const [{cart}, dispatch] = useStateValue();

    const deletecart = () => {

        dispatch({
            type:"DELETE_FROM_BASKET",
            id:id,
        });
    };
    
    return (
        <div className="cartlist">
            <div className="cartlist__left">
                <img 
                    src={image}
                    className="cart_img"
                    alt=""
                />
            </div>

            <div className="cartlist__right">
                <p className="cartlist__title">
                    <strong>{title}</strong>
                </p>

                 <p className="cartlist__category">
                    {category}
                </p>

                <p className="cartlist__description">
                    ${price}
                </p>

                <div className="cartlist__rating">
                    {Array(rating).fill().map(()=>(
                        <p>⭐</p>
                    ))}
                </div>

                <button onClick={deletecart} key={cart} className="cartlist__remove">Remove from Cart</button>

            </div>
        </div>
    )
}

export default CartList
