import React, {useEffect} from "react";
import axios from './Reducer_axios/axios';
import './Nav/header.css';
import Header from "./Nav/Header";
import Home from './Homepage/Home';
import Footer from './Footer/Footer';
import OrderHistory from './Payment/OrderHistory';

import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Checkout from "./Payment/Checkout";
// import {auth} from './firebase';
import { useStateValue } from './Reducer_axios/StateProvider';
import AllProduct from './Product/AllProduct';
import ProductPage from "./Product/ProductPage";
import Payment from './Payment/Payment';
import Sign from "./SignUser/Sign";
import {Elements} from '@stripe/react-stripe-js'
import { loadStripe } from "@stripe/stripe-js";

const stripePromise  = loadStripe("pk_test_51J8iDkBpvurkveoQlqq24fzSFVqXyUgVz85IrpfZvr0w1omShaY7lD5TYzoeifVVEV2dAxyyhK6JSo8znxNf230A00qsm9g8Dp");

function App() {

  const [{products}] = useStateValue();

  const saveProductToLocal=(items)=>{
    localStorage.setItem('shopItems', JSON.stringify(items));
  }

  useEffect(() => {
    const fetchProductFromBackEnd =async()=>{
      await axios.get('/products/show')
      .then((res)=>{
          products.push(...res.data);
      })
      .catch(err=>console.log(err.message))
  
      saveProductToLocal(products);
    }
    fetchProductFromBackEnd();
  }, [products])

  return (
    //BEM
    <Router>
      <div className="app">
        <Switch>

          <Route path ='/Login'>
            <Sign/>
          </Route>

          <Route path = '/order'>
            <Header/>
            <OrderHistory/>
          </Route>

          <Route path ='/payment'>
            <Header/>
            <Elements stripe={stripePromise}>
              <Payment />
            </Elements>
          </Route>

          <Route path='/checkout'>
            <Header />
            <Checkout />
            <Footer />
          </Route>

          <Route path='/products'>
            <Header />
             <AllProduct/>
             <Footer />
          </Route>

          <Route path='/view_one'>
            <Header />
            <ProductPage/>
            <Footer />
          </Route>

          <Route path='/'>
            <Home />
          </Route>
          
        </Switch>
      </div>
    </Router>
  );
}

export default App;
