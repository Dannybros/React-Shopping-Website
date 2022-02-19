import express from 'express';
import auth2 from '../middleware/auth2.js';

const router = express.Router();

router.get('/', auth2, (req, res)=>{
    res.send("this works");
})

export default router;