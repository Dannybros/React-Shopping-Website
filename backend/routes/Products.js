import express from 'express';
import ProductInfo from '../models/ProductSchema.js';

const router = express.Router();

router.get('/', async (req, res)=>{

    await ProductInfo.find((err, data)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).json(data);
        }
    })

})

router.post('/', async (req, res)=>{
    const dbProduct = req.body;

    await ProductInfo.create(dbProduct, (err, data)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(201).send(data);
        }
    })
    // add async to top...
    // const newproduct = new ProductInfo(dbProduct);
    // try {
    //     await newproduct.save();
    //     res.status(201).json(newproduct);
    // }
    // catch (error) {
    //     res.status(401).json({message:error.message})
    // }
})

export default router;