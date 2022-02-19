import express from 'express';
import UserInfo from '../models/UserSchema.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const router = express.Router();
dotenv.config();

router.post('/', async(req, res)=>{
    const {email, password} = req.body;

    try{
        const existingUser = await UserInfo.findOne({email});

        if(!existingUser) return res.send({message: "User doesn't exit"});

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) return res.json({message: "Password doesn't match."}); 

        const secret_key = process.env.JWT_SCRECT_KEY
        const token = jwt.sign({email: existingUser.email, id:existingUser._id}, secret_key, {expiresIn: '1h' });

        // await res.headers('authorization', token).send(token);
        res.json({result:existingUser});

    }catch(error){  
        res.json({message: "Something went wrong"});
    }
})

export default router;