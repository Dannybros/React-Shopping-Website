import React, {useState}from 'react'
import {useHistory} from 'react-router-dom';
import logo from '../img/close1.jpg';
import "./header.css";
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Link } from 'react-router-dom';
import { useStateValue } from '../Reducer_axios/StateProvider';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";

const theme = createTheme({
  overrides: {
    MuiOutlinedInput: {
      root: {
        "& $notchedOutline": {
          borderColor: "green"
        },
        "&:hover $notchedOutline": {
          borderColor: "red"
        },
        "&$focused $notchedOutline": {
          borderColor: "purple"
        },
        // "&&& $input": {
        //   padding: "10px"
        // }
      }
    },
    MuiAutocomplete: {
      inputRoot: {
        '&&[class*="MuiAutocomplete-endAdornment"] $input': {
          right:"3px"
        }
      }
    }
  }
});

function Header() {

    const [{cart}, dispatch] = useStateValue();
    const option=[];
    const [searchWord, setSearchWord] = useState('');
    const products = JSON.parse(localStorage.getItem('shopItems'))
    const [customer, setCustomer] = useState(JSON.parse(localStorage.getItem('UserProfile')));
    
    const history = useHistory();
    
    products?.map(item =>{
       option.push(item.title)
       return null;
    })

    const SignOut=async()=>{
        if(customer){
            setCustomer(null);
            dispatch({
                type: 'Clear_BASKET',
            });
            
            localStorage.removeItem('UserProfile');
            history.push('/')
            alert('you have logged out');
        }else{
            history.push('/Login')
        }

    }

    const handleChange =(e)=>{
        setSearchWord(e.target.value);
    }
    
    const searchClick = async()=>{
        const isSame = option.includes(searchWord);
        if(isSame){
            const viewItem = products.filter(item=>item.title === searchWord)
            localStorage.setItem("view", JSON.stringify(viewItem[0]));
            history.push('/view_one');
        }
        else{
            alert("we don't have such product")
        }
    }

    return (
       <div className = "header">
            <Link to='/'> 
                <img
                    className = "header_logo"
                    src ={logo}
                    alt=""
                />
            </Link> 
        
            <div className = "header_search">
                {/* <input type ="text" className="header_searchInput"/> */}
                <Autocomplete
                    id="free-solo-demo"
                    freeSolo
                    disableClearable
                     forcePopupIcon={false}
                    onChange={(event, value) => setSearchWord(value)}
                    className="header_searchInput"
                    style={{width:"100%", color:"white", marginTop:"-10px", padding:"2px"}}
                    options={option.map((item) => item)}
                    renderInput={(params) => (
                        <MuiThemeProvider theme={theme}>
                            <TextField 
                                {...params} 
                                onChange={handleChange}
                                className="searchInput_text"
                                style={{background:"white", borderRadius:"8px"}}
                                margin="normal" 
                                variant="outlined" 
                            />
                        </MuiThemeProvider>
                    )}
                />
                
                <SearchIcon className="header_searchIcon" onClick={searchClick}/>  
                
            </div>

            <div className = "header_nav">
                <div className ="header_option">
                    <span className ="header_optionLineOne">
                        Hello
                    </span>
                    <span className ="header_optionLineTwo hoverHeader">
                       {customer? customer.name : 'Guest'}
                    </span>
                </div>
              
                <div className ="useless">
                    <span className ="signbtn" onClick={SignOut}>{customer? 'Log Out' : 'Sign In'}</span>
                </div>

                <Link to='/checkout'>
                    <div className="header_optionBasket hvr-bounce-in">
                        <ShoppingBasketIcon className="basketIcon" />
                        <span className="header_optionLineTwo header_basketCount ">
                            {cart?.length }
                        </span>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Header
