import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import greeting from './routes/greeting.js';
import products from './routes/Products.js';
import usersignIn from './routes/userSignIn.js';
import usersignUp from  './routes/userSignUp.js';
import orderInfo from './routes/order.js';
import Stripe from 'stripe';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit:50000}));


mongoose.connect(process.env.connection_url,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
})

mongoose.set('useFindAndModify', false);

mongoose.connection.on("connected", ()=>{
    console.log("Mongoose is conneted");
})

app.get('/', (req, res)=> {
    res.status(200).send("Hello World");
});

app.use('/greeting', greeting);

app.use('/products/show', products);

app.use('/user/signup', usersignUp);

app.use('/user/signin', usersignIn);

app.post('/test', async(req, res)=>{
    const {password, email} = req.body;
    if(password!=email) return res.json({message:'pw no match'});
    res.json({message:'they are match'})
})

app.post('/payment/create', async(req, res)=>{
    const {price} = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: price,
      currency: 'usd',
    });

    res.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })

})

app.use('/order/history', orderInfo);

app.listen(port, ()=>console.log(`app is starting now in ${port}`));