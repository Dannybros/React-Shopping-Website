import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    userId:String,
    title:String,
    price:String,
    image:[String],
    category:String,
    description:String,
    rating:Number,
    createAt:{
        type:Date,
        default:Date.now()
    }
});

const OrderInfo = mongoose.model('OrderInfo', orderSchema);

export default OrderInfo;