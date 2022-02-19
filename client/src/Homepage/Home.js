import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router';
import "./Home.css";

import bed from '../img/product-3.jpeg';
import KeyboardArrowUpOutlinedIcon from '@material-ui/icons/KeyboardArrowUpOutlined';
import ReactTooltip from "react-tooltip";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Carousel from './Carousel';
import Footer from '../Footer/Footer';
import Header from '../Nav/Header';
import '../Payment/Checkout.css';


function Home() {
    const history = useHistory();
    const [isVisible, setIsVisible] = useState(false);

    const customer = JSON.parse(localStorage.getItem('UserProfile'));

    const toggleVisibility = () => {
        if (window.pageYOffset > 400) {
        setIsVisible(true);
        } else {
        setIsVisible(false);
        }
    };

    const scrollTop = () =>{
        window.scrollTo({
            top:0,
            behavior:"smooth"
        })
    }

    const OrderClick = ()=>{
        if(customer!=null){
            history.push('/order');
        }else{
            alert('You have to log in')
        }
    }
    
    useEffect(()=>{
        window.addEventListener("scroll", toggleVisibility);
        AOS.init();
        return () => {
            setIsVisible(false)
        }
    }, []); 

    return (
        <div>
        <Header />
        <div className ="home">
            <div className="home__container">
                <div className="hero_container" data-aos="fade-left" data-aos-easing="linear"
     data-aos-duration="1500">
                    <div className="just_button" data-aos="fade-up-right" data-aos-easing="linear"
     data-aos-duration="1500">
                        <strong onClick={()=>history.push('/products')}>See Products</strong>
                    </div>
                </div>
            </div>
            
            {isVisible && 
                <div className="arrowBox"  onClick={scrollTop} >
                    <div className="scrollTop" data-tip data-for="tooltip-scrolling">
                        <KeyboardArrowUpOutlinedIcon className="arrowTop"/>
                    </div> 
                    <KeyboardArrowUpOutlinedIcon className="arrowTop stickbot" />
                    <KeyboardArrowUpOutlinedIcon style={{bottom:"3.3rem"}} className="arrowTop stickbot"/>
                    <ReactTooltip id="tooltip-scrolling" place="left" effect="solid">
                        Go to Top
                    </ReactTooltip>
           
                </div>
            }
           
            <div className="Home_Intro">
                <div className="intro_left"/>
                <div className="Intro_content" data-aos="zoom-in-up" data-aos-easing="ease " data-aos-duration="2000">
                    <h1>Shopping Mall</h1>
                    
                    <p>
                        Welcom to My shopping website.
                        <br/>
                        This is my first practice React Js + MongoDB Shopping website.
                    </p>
                    <p>
                        I got products from fakeApiStore api. 
                            <br/>
                        Adding to Carts or Payment also works. 
                    </p>
                    <p>
                        You can test checkout using fake visa key 4242 4242 4242
                        <br/>
                        This website has been deployed by netlify, while backend is in heroku.
                        <br/><br/>
                        Please Enjoy!
                        
                    </p>
                </div>
                    
                <img src = {bed} className="Intro_img" data-aos="zoom-out" data-aos-easing="linear" data-aos-duration="1000" alt=""/>
                <div className="intro_right"/>
            </div>

            <div className="Intro2">
                <p className="NewProduct"  data-aos="fade-up" data-aos-anchor-placement="top-center">New Products</p>
                <div>
                  {/* calusal */}
                  <Carousel/>
                </div>
            </div>
            
            <div className="diag">
                <div className="dialog-box" data-aos="zoom-out-right" data-aos-duration="1000" onClick={OrderClick}><h1>View Orders</h1></div>                      
            </div>
            <Footer />
        </div>
        </div>
    )
}


export default Home
