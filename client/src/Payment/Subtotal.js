import React from 'react'
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import './Checkout.css';
import { useStateValue } from '../Reducer_axios/StateProvider';

function Subtotal() {

    const [{cart}] = useStateValue();

    let len = cart.length;
    const totalPrice = cart?.reduce((amount, item)=> parseFloat(item.price) +  parseFloat(amount), 0);

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

                <button className="btnCheckOut"><a href="/payment">Proceed to Checkout 🤑🤑</a></button>
            </div>
        )
}

export default Subtotal
