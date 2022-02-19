import express from 'express';
import OrderInfo from '../models/OrderSchema.js';

const router = express.Router();

router.get('/', async (req, res)=>{

    await OrderInfo.find((err, data)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).json(data);
        }
    })

})

router.post('/', async(req, res)=>{
    const dbProduct = req.body;

    await OrderInfo.create(dbProduct, (err, data)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(201).send(data);
        }
    })
})

export default router;