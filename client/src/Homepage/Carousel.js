import React, {useState} from 'react';
import './Carousel.css';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/swiper-bundle.css';
import SwiperCore, {Navigation, Thumbs} from 'swiper';
import 'aos/dist/aos.css';

import bed1 from '../img/product-1.jpeg';
import bed2 from '../img/product-2.jpeg';
import bed3 from '../img/product-3.jpeg';
import bed4 from '../img/product-4.jpeg';
import bed5 from '../img/product-5.jpeg';
import bed6 from '../img/product-6.jpeg';
import bed7 from '../img/product-7.jpeg';
import bed8 from '../img/product-8.jpeg';

SwiperCore.use([Navigation, Thumbs]);
function Carousel() {
    
    const [thumsSwiper, setThumbsSwiper]= useState(null);
    const img = [bed1, bed2, bed3, bed4, bed5, bed6, bed7, bed8];

    return (
        <div 
            className="carousel" 
            data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
        >
            <Swiper 
                className="Main_imag"
                tag="section"
                thumbs={{swiper:thumsSwiper}}
                wrapperTag="ul"
                spaceBetween={110}
                slidesPerView={1}
                navigation
            >
                {img.map((item, i)=>{
                    return(
                        <SwiperSlide 
                            tag="div" 
                            key={`slide-${i}`} 
                            className="Swiper__cont"
                        >
                            <img src={item} className="slider_img" style={{listStyle:'none'}} alt=""/>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
                <div style={{margin:"50px"}}></div>
            <Swiper 
                id="thumbs" 
                spaceBetween={5} 
                slidesPerView={8} 
                onSwiper={setThumbsSwiper}
            >
                {img.map((item, i)=>{
                    return(
                        <SwiperSlide tag="div" key={`thumb-${i}`}>
                            <img src={item} className="thumbs_img" alt=""/>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div>
    )
}

export default Carousel

