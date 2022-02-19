import React, {useState} from 'react'
import './AllProduct.css';
import Product from './Product';
import {CSSTransition} from 'react-transition-group';
import CategoryIcon from '@material-ui/icons/Category';

import {ReactComponent as DropIcon} from '../img/DropDown.svg';
import {ReactComponent as Arrow} from '../img/arrow.svg';
import {ReactComponent as SettingIcon} from '../img/settingIcon.svg';

export default function AllProduct() {
    const [open, setOpen] = useState(false);
    const [categoryTitle, setCategoryTitle] = useState('All Products')
    
    const itemProducts = JSON.parse(localStorage.getItem('shopItems'));

    function getUnique(arr, index) {

        const unique = arr
            .map(e => e[index])

            // store the keys of the unique objects
            .map((e, i, final) => final.indexOf(e) === i && i)

            // eliminate the dead keys & store unique objects
            .filter(e => arr[e]).map(e => arr[e]);      

        return unique;
    }

    function DropDownBox(props){
    
        const[activeMenu, setActiveMenu] = useState('menu');
        const [menuHeight, setMenuHeight] = useState(null);
        
        const cartList = getUnique(props.item, "category");

        function calcHeight(el){
            const height = el.offsetHeight;
            setMenuHeight(height);
        }


        function DropdownItem(props){
            return(
                <div 
                    className="menu_item" 
                    onClick={()=>{
                        !props.goToMenu && setCategoryTitle(props.children); 
                        props.goToMenu && setActiveMenu(props.goToMenu);
                    }}
                >
                    <span className="leftIcon icon-button" >{props.icon}</span>
                    {props.children}
                </div>
            )
        }

        return(
            <div className="DropdownBox" style={{height:menuHeight}}>
                <CSSTransition
                    in={activeMenu==='menu'}
                    timeout={500}
                    classNames="menu-primary"
                    unmountOnExit
                    onEnter={calcHeight}
                >
                    <div className="menu">
                        {cartList.map((i)=>{
                            return(
                                <DropdownItem icon={<CategoryIcon/>} key ={i.category}>{i.category}</DropdownItem>
                            )
                            
                        })}
                        <DropdownItem icon={<SettingIcon/>} goToMenu="setting">Category2</DropdownItem>
                    </div>
                    
                </CSSTransition>

                <CSSTransition
                    in={activeMenu==='setting'}
                    timeout={500}
                    classNames="menu-secondary"
                    unmountOnExit
                    onEnter={calcHeight}
                >
                    <div className="menu">
                        <DropdownItem icon={<Arrow/>} goToMenu="menu">Go Back</DropdownItem>
                        <DropdownItem icon="🌭 ">All Products</DropdownItem>
                    </div>
                    
                </CSSTransition>

            </div>
        )
    }

    const showHideDropDown=()=>{
        setOpen(!open);
    }

    const filterProducts=(products)=>{
        let temProducts = products;
        if(categoryTitle!=="All Products"){
            temProducts = products.filter((i)=>{return i.category===categoryTitle});
            return temProducts
        }else{
            return products
        }
    }

    return (
        <div>
            <div className="product_category">
                <div className="Category__type">
                    <div className="DropDown">
                        <div className="category__dropdown__icon icon-button" onClick={showHideDropDown}>
                            {<DropIcon/>}
                        </div>
                        {open && <DropDownBox item={itemProducts}/>}
                    </div>
                    
                    <h3>{categoryTitle}</h3>
                </div>
            </div>
            <div className="productDom">
                {filterProducts(itemProducts).map((item, i)=>{
                    return (
                        <Product
                            key={i}
                            id={item._id} 
                            image={item.image}
                            price={item.price}
                            title={item.title}
                            category={item.category}
                            description = {item.description}
                            rating={3}
                        />
                    )
                })}
             </div>
        </div>
    )
}


