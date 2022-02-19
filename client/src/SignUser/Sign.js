import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {Avatar, Button, Paper, Grid , Typography, Container} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import usestyle from './Style';
import axios from '../Reducer_axios/axios';
import { CustomInput } from './CustomInput';
import Header from '../Nav/Header';

const initials = {firstName:'', lastName:'', confirmPassword:'' , email:'', password:''} 

function Sign() {

    const history = useHistory();
    const classes = usestyle();

    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);

    const [formData, setFormData]=useState(initials);

    const signIn= async()=>{
      
        await axios.post('/user/signin', formData)
        .then((res)=>{
            console.log(res.data);
            
            localStorage.setItem('UserProfile', JSON.stringify(res.data.result));
            history.goBack();
          })
        .catch(error=>console.log(error))
    }

    const signUp = async()=>{
        try {
            
            await axios.post('/user/signup', formData)
            .then((res) =>{ 
                if(res.data.message){
                    alert(res.data.message);
                    
                }else{
                    alert(res.data);
                    setIsSignUp(false);
                }
            })
           
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleSubmit= async(e)=>{
        e.preventDefault();
        if(isSignUp){
            signUp();
        }
        else{
            signIn();
        }
    }

    const handleOnChange =(e)=>{
        setFormData({...formData, [e.target.name]: e.target.value});
    }
    
    const handleShowPassword=()=>{
        setShowPassword(!showPassword);
    }

    const switchMode=()=>{  
        setIsSignUp(!isSignUp);
        setShowPassword(false);
    }

    return (
        <div>
        <Header/>
        <Container component='main' maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar }>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography variant='h5'>
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                </Typography>
                <form className={classes.form}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <>
                                    <CustomInput name="firstName" label="First Name" handleChange={handleOnChange}  half />
                                    <CustomInput name="lastName" label="Second Name" handleChange={handleOnChange}  half />
                                </>
                            )
                        }
                        <CustomInput name="email" label="Email Address" handleChange={handleOnChange} type="email"/>
                        <CustomInput name = "password" label="Password" handleChange={handleOnChange} 
                            showPassword={handleShowPassword} type={showPassword?"text" : "password"}/>
                        {isSignUp && <CustomInput name="confirmPassword" label="Repeat Password" handleChange={handleOnChange} type="password"/>}
                    </Grid>


                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} onClick={handleSubmit}>
                        {isSignUp? "Sign Up" : "Sign In"}
                    </Button>
                    
                    <Grid container justifyContent="flex-start" >
                        <Grid>
                            <Button onClick={switchMode} style={{fontSize: "16px"}}>
                                {isSignUp? "Already have an account ? Sign In": "New here? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
        </div>
    )
}

export default Sign
