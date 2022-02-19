import React from 'react';
import "./Footer.css";
import PlaceIcon from '@material-ui/icons/Place';
import PhoneIcon from '@material-ui/icons/Phone';
import MailIcon from '@material-ui/icons/Mail';
import StorefrontIcon from '@material-ui/icons/Storefront';
import InstagramIcon from '@material-ui/icons/Instagram';
import YouTubeIcon from '@material-ui/icons/YouTube';
import TwitterIcon from '@material-ui/icons/Twitter';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import FacebookIcon from '@material-ui/icons/Facebook';

function footer() {
    return (
        <div className="footers">
            <div className="con">
                <div className="row1">
                    <h1>About Company</h1>
                    <p className="description">
                        We are a young company always looking for new and creative ideas 
                        to help you with our products in your everyday work.
                    </p>
                    <p className="description">By Me hahaha</p>
                </div>
                <div className="row2">
                    <h2 className="rowSide">Contact</h2>
                    <div className="contact">
                        <div className="contact_list">
                            <div className="IconText"><PlaceIcon/></div>
                            adlakjha adfadfa
                        </div>
                        <div className="contact_list">
                            <div className="IconText"><PhoneIcon/></div>
                            adlakjha adfadfa
                        </div>
                        <div className="contact_list">
                            <div className="IconText"><MailIcon/></div>
                            adlakjha adfadfa
                        </div>
                        <div className="contact_list">
                            <div className="IconText"><StorefrontIcon/></div>
                            adlakjhaadfadfa 
                        </div>
                    </div>
                </div>
                <div className="row3">
                    <h2 className="rowSide">Follow us</h2>
                    <div className="Icons">
                        <div className="Icon_Container">
                            <FacebookIcon/>
                        </div>
                        <div className="Icon_Container">
                            <TwitterIcon/>
                        </div>
                        <div className="Icon_Container">
                            <YouTubeIcon/>
                        </div>
                        <div className="Icon_Container">
                            <WhatsAppIcon/>
                        </div>
                        <div className="Icon_Container">
                            <InstagramIcon/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default footer
