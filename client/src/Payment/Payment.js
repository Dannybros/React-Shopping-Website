import React, {useState, useEffect} from 'react'
import './payment.css';
import axios from '../Reducer_axios/axios';
import {TextField, Grid, Button, CircularProgress } from "@material-ui/core";
import { CardNumberElement, CardExpiryElement, CardCvcElement, useElements, useStripe} from "@stripe/react-stripe-js";
import StripeInput from './StripeInput';
import { useStateValue } from '../Reducer_axios/StateProvider';
import useStyle from '../SignUser/Style';
import { useHistory } from 'react-router';

const deliveryinitial = {fistName:"", lastName:"", line1:"", city:"", postal_code:"", country:""};

function Payment() {
    const history = useHistory();
    const stripe = useStripe();
    const elements = useElements();
    
    const classes = useStyle();

    const [{cart}, dispatch] = useStateValue();
    const [deliveryInfo, setDeliveryInfo] = useState(deliveryinitial);
    const [loading, setLoading] = useState(false);
    const [clientSecret, setClientSecret] = useState(null);

    const totalPrice = cart?.reduce((amount, item)=> parseFloat(item.price) +  parseFloat(amount), 0);

    const user = JSON.parse(localStorage.getItem('UserProfile'));
  
    const cardsLogo = [
        "amex",
        "cirrus",
        "diners",
        "dankort",
        "discover",
        "jcb",
        "maestro",
        "mastercard",
        "visa",
        "visaelectron",
    ];

    const stripeDataObjectConverter = ({ firstname, lastname, line1, postal_code, city, country},cardElement) => ({
        payment_method: {
            card: cardElement,                                                                                                                                                                                         
            billing_details: {
                address: {
                    city,
                    country: country.code,
                    line1,
                    postal_code,
                    state: null
                },
                name: firstname + lastname,
                phone: null
            },
        },
    })

    const sendToOrderList = async () => {

        const orderUser_id = user.result?.googleId ? user.result?.googleId : user.result?._id;
        
        await cart.map(item=>{
            const orderSchema = {...item, userId: orderUser_id};
            axios.post('/order/history', orderSchema)
            .catch((err)=> console.log(err.message));
            return null;
        })
    }
    
    const capture= async () =>{
        setLoading(true);

        const cardElement = elements.getElement(CardCvcElement);
        const stripeDataObject = stripeDataObjectConverter(deliveryInfo, cardElement);
    

        const {paymentIntent, error} = await stripe.confirmCardPayment(clientSecret, stripeDataObject);
        if (error) {
            alert(error.message)
            
            setLoading(false);
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
            
            setLoading(false);
            alert("payment success!")
            sendToOrderList();
            dispatch({
                type:'Clear_BASKET'
            })
            history.replace('/order');
        }

    }

    const handleChange = event =>{
        setDeliveryInfo({...deliveryInfo, [event.target.name]:event.target.value});
    }

    const handleNext = async (e)=>{
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        capture();
    }

    useEffect(() => {
        const price = {price:parseInt(totalPrice*100)};
        const getClientSecret = async () =>{
            const response = await axios.post('/payment/create', price )
            setClientSecret(response.data.clientSecret);
        }
       getClientSecret();
       
    }, [totalPrice])

    return (
        <div className="payment">
            <div className="payment__container">

                {/* Payment-section - payment delivery */}
                <div className="payment__Delivery">

                    <div className="payment__Delivery_Head">
                        <div className="payment__title">
                            <h2>Delivery Address</h2>
                            <p className="reminder_text">You can type whatever you want</p>
                        </div>

                        <div className="payment__address">
                            <p>{deliveryInfo?.firstName} {deliveryInfo?.lastName}</p>
                            <p>{deliveryInfo?.line1}</p>
                            <p>{(deliveryInfo?.city.toUpperCase())} {(deliveryInfo?.country.toUpperCase())}</p>
                        </div>
                    </div>

                    {/* shipping address */}
                    <div className="shipping_address">
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="firstName"
                                    name="firstName"
                                    label="First name"
                                    value={deliveryInfo.firstName}
                                    onChange={handleChange}
                                    fullWidth
                                    autoComplete="given-name"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="lastName"
                                    name="lastName"
                                    label="Last name"
                                    value={deliveryInfo.lastName}
                                    onChange={handleChange}
                                    fullWidth
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    id="address"    
                                    name="line1"
                                    label="Address line"
                                    value={deliveryInfo.line1}
                                    onChange={handleChange}
                                    fullWidth
                                    autoComplete="shipping address-line1"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="city"
                                    name="city"
                                    value={deliveryInfo.city}
                                    onChange={handleChange}
                                    label="City"
                                    fullWidth
                                    autoComplete="shipping address-level2"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField id="state" name="state" label="State/Province/Region" fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="zip"
                                    name="postal_code"
                                    onChange={handleChange}
                                    label="zip / Postal code"
                                    value={deliveryInfo.postal_code}
                                    fullWidth
                                    autoComplete="shipping postal-code"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="country"
                                    name="country"
                                    value={deliveryInfo.country}
                                    onChange={handleChange}
                                    label="Country"
                                    fullWidth
                                    autoComplete="shipping country"
                                />
                            </Grid>
                        </Grid>
                    </div>
                </div>

                {/* Payment-section - payment method */}
                <div className="payment__section">
                    <div className="payment__Method">
                        <h2>Payment Method<span style={{marginLeft:'10px'}}>(`${totalPrice}`)</span></h2>
                        <div style={{marginTop:"10px"}}>
                            {cardsLogo.map(e => <img key={e} src={`./cards/${e}.png`} alt={e} width="50px" align="bottom" style={{ padding: "0 5px" }} />)}
                        </div>
                        <p className="reminder_text">Test card Name: write whatever </p>
                        <p className="reminder_text">Test card number: 4242 4242 4242 4242</p>
                         <p className="reminder_text">Test card Expire: 04/24 </p>
                          <p className="reminder_text">Test card Name: whatever number 233, 452 etc </p>
                    </div>
                    
                    <div className="payment__Details">
                        <form onSubmit={handleNext}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        name="name"
                                        label="Name"
                                        variant="outlined"
                                        fullWidth
                                        autoComplete="given-name"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        name="ccnumber"
                                        label="Credit Card Number"
                                        variant="outlined"
                                        fullWidth
                                        InputProps={{
                                            inputProps: {
                                                component: CardNumberElement
                                            },
                                            inputComponent: StripeInput,
                                        }}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Grid>
                                <Grid item xs={6} sm={6}>
                                    <TextField
                                        label="Expiration Date"
                                        name="ccexp"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        InputProps={{
                                            inputProps: {
                                                component: CardExpiryElement
                                            },
                                            inputComponent: StripeInput
                                        }}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Grid>
                                <Grid item xs={6} sm={6}>
                                    <TextField
                                        label="CVC"
                                        name="cvc"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        InputProps={{
                                            inputProps: {
                                                component: CardCvcElement
                                            },
                                            inputComponent: StripeInput
                                        }}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Grid>
                            </Grid>
                            {/* <CardElement/> */}
                            <Button 
                                variant="contained"
                                color="primary"
                                type="submit"
                                className={classes.submit}
                                style={{padding:"10px", width:"100%"}}
                                disabled={loading}
                            >
                                {loading?<CircularProgress size={24}/>:'Pay'}

                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
