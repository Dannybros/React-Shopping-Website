import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    title:String,
    price:String,
    image:[String],
    category:String,
    description:String,
    rating:Number,
    createAt:{
        type:Date,
        default:new Date()
    }
});

const ProductInfo = mongoose.model('ProductInfo', productSchema);

export default ProductInfo;