import React, {useEffect} from 'react'
import { useHistory } from 'react-router';
import './ProductPage.css';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Magnifier from "react-magnifier";
import { useStateValue } from '../Reducer_axios/StateProvider';

function ProductPage() {

    const [{user}, dispatch] = useStateValue();
    const history = useHistory();

    const item_one = JSON.parse(localStorage.getItem("view"));
    
    const product_image = item_one.image;

    const addToBasket =async() =>{
        await dispatch({
            type:"ADD_TO_BASKET",
            item: item_one,
        });
        localStorage.removeItem('view');
        history.replace('/products');
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <div className="View-product" user={user}> 

            {/* this is for top and bottom part of page: 
                top->showing product details.
                bottom->showing ads and other category items.
            */}
            <div className="product__Top"> 
                <div className="product__img" >
                    {/* For magnifying image*/}
                    <div className="image__zoomer"> 
                        <Magnifier src={product_image} className="magnifying-glass_no1 zoomer_imag" mgWidth={140} mgHeight={140} mgTouchOffsetX={-20} mgTouchOffsetY={-20}/>
                    </div>
                </div>
                
                {/* Displaying thumbnail pics */}
                <div className="product__info"> 
                    
                    <h1 className="product___title">
                        {item_one.title}
                    </h1>
                    
                    <div className="product___detail_box">
                        <p className="product___detail"> 
                            <span className="product__detail_q">Product Type: </span>
                            <span className="product__detail_info">{item_one.category}</span>
                        </p>
                       <p className="product___detail"> 
                            <span className="product__detail_q"> Price: </span>
                            <span className="product__detail_info">${item_one.price}</span>
                        </p>
                        <p className="product___detail desInfo"> 
                            <span className="product__detail_q">Description: </span>
                            <span className="product__detail_info descriptioner">
                                {item_one.description}
                            </span>
                        </p>
                        <p className="product___detail"> 
                            <span className="product__detail_q"> Rating: </span>
                            <span className="product__detail_info ratings">
                                {Array(item_one.rating).fill().map((_,i)=>(
                                    <em key={i}>⭐</em>
                                ))}
                            </span>
                        </p>
                       
                    </div>
                    <div className="btn_box">
                        <button className="BtnAddToCart" onClick={addToBasket}>Add to Cart + <ShoppingCartIcon/></button>
                    </div>
                    <div>

                    </div>
                </div>
                
            </div>
            <div className="product__bottom">
                {/* advertisement for rest*/}
                ads
            </div>
        </div>
    )
}

export default ProductPage
