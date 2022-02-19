import express from 'express';
import UserInfo from '../models/UserSchema.js';
import bcrypt from 'bcryptjs';
import * as EmailValidator from 'email-validator';

const router = express.Router();

router.post('/', async (req, res)=>{

        const { email, password, firstName, lastName, confirmPassword } = req.body;

        const validateEmail = EmailValidator.validate(email);
        
        if(!validateEmail) return res.json({message: "Email is not real"});

        const existingUser = await UserInfo.findOne({email});

        if(existingUser) return res.json({message: "User already exit"});

        if(password !== confirmPassword){
            return res.json({message: "Password don't match"});
        } 

        const hashpw= await bcrypt.hash(password, 10);

        const result = await UserInfo.create({email, password:hashpw, name: `${firstName} ${lastName}`});

        res.json("You have logged in successfully");

})

export default router;