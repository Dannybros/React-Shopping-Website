import React from 'react'
import "./Product.css";
import { useHistory } from 'react-router';

function Product({id,image, title,price, rating, description, category}) {
    const history = useHistory();
    const oneProduct = {id,image, title,price, rating, description, category};

    const ProductDetail=async()=>{
        await localStorage.setItem("view", JSON.stringify(oneProduct));
        history.push('/view_one');
    }

    return (
        <div className="product" onClick={ProductDetail} key={id.toString()}>
            <div className="img_container">
                <img
                    src={image}
                    alt=""
                    className="product_img"
                />
                <button className="btn_forView" onClick={ProductDetail}>For more Detail</button>
            </div>
            <div className="product_Info">
                <div className="product_Title">
                    <h4>{title}</h4>
                </div>
                <span className="product_price"><strong>${price}</strong></span>
                <span className="product_rating">
                    {Array(rating).fill().map((_,i)=>(
                        <p key={i}>⭐</p>
                    ))}
                </span>
            </div>
        </div>
    )
}

export default Product
