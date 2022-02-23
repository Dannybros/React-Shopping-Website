import React from 'react'
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import './Checkout.css';
import { useStateValue } from '../Reducer_axios/StateProvider';
import {useHistory} from 'react-router-dom';

function Subtotal() {

    const history = useHistory();

    const [{cart}] = useStateValue();

    const user = JSON.parse(localStorage.getItem('UserProfile'));

    let len = cart.length;
    const totalPrice = cart?.reduce((amount, item)=> parseFloat(item.price) +  parseFloat(amount), 0);
    
    const goToPayment=()=>{
        if(user!==null){
            if(totalPrice===0){
                alert("No item to buy!")
            }else{

                history.push('/payment');
            }
        }else{
            alert("Please Register the account first.")
        }
    }
    return (
        <div className="subtotal">
        <CurrencyFormat
                renderText={(value) =>(
                    <>
                        <p>
                            Subtotal({len} items):<strong>{value}</strong>
                        </p>
                        <small className="subtotal__gift">
                            <input type="checkbox" /> This order contains a gift
                        </small>
                    </>
                )}
                decimalScale={2}
                value={totalPrice}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />

            <button className="btnCheckOut" onClick={goToPayment}><a href="/payment">Proceed to Checkout 🤑🤑</a></button>
        </div>
    )
}

export default Subtotal
