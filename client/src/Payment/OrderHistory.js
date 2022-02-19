import React, {useState, useEffect} from 'react'
import './Order.css';
import axios from '../Reducer_axios/axios';
import GridLoader from "react-spinners/GridLoader";

function OrderItem({title, price, category, rating, orderDate, img}){
    const dateTime = orderDate;
    const YearDate = dateTime.split('T');
    const HourDate = YearDate[1].slice(0, -5);
    return(
        <div className="order_item_container">
            <div className="order_item">
                <img className="order_img_container" src={img} alt=""/>
                <div className="info">
                    <div className="order_item_title">
                        {title}
                    </div>
                    <div className="order__info">
                        <span className="order__info_tag">Orderd Date:</span>
                        <span className="order__info_i order__date">{YearDate[0]} / {HourDate}</span>
                    </div>
                    
                    <div className="order__info">
                        <span className="order__info_tag">Product Price:</span>
                        <span className="order__info_i">$ {price}</span>
                    </div>
                    <div className="order__info">
                        <span className="order__info_tag">Product category:</span>
                        <span className="order__info_i">{category}</span>
                    </div>
                    <div className="order__info">
                        <span className="order__info_tag">Product rating:</span>
                        <span className="order__info_i">{rating}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

function OrderHistory() {
    const [urOrders, setUrOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem('UserProfile'));

    useEffect(() => {

        setLoading(true);

        const getOrders = async()=>{ 
            const {data} = await axios.get('/order/history');
            const userId = user.result?.googleId ? user.result?.googleId : user.result?._id;
            const matchUser = data.filter((item)=>item.userId===userId);
            setUrOrders(matchUser);
        }

        getOrders()
        setLoading(false)
    }, [user])


     const totalPrice = urOrders?.reduce((amount, item)=> parseFloat(item.price) +  parseFloat(amount), 0);

    return (
            <div className="orderpage">
                {loading ? 
                    <div style={{width:'100%', height:"90vh", display:'flex', alignItems:'center', justifyContent:'center'}}>
                        <GridLoader loading={loading} color={'blue'} size={30} margin={3} />
                    </div>
                    :
                    <>
                    <div className="orderPage_Header">
                        <div className="orderPage_title">
                            {(user.result?.name.toUpperCase())}'s Order History 
                            (You spent total ${totalPrice.toFixed(2)})
                        </div>
                    </div>
                    <div className="order_container">
                        <div className="list_Order">
                            {
                                urOrders.map(item=>{
                                    return(
                                        <OrderItem
                                            title={item.title}
                                            price ={item.price}
                                            category = {item.category}
                                            rating = {item.rating}
                                            orderDate = {item.createAt}
                                            img = {item.image}
                                        />
                                    )
                                })
                            }
                            <p className="list_bottom">
                                You have ordered {urOrders.length} products in total
                            </p>
                        </div>
                    </div>
                    </>
                }
            </div>
        
    )
}

export default OrderHistory
