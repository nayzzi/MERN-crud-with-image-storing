const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    ImgPath:{
        type:String,
        required:true
    },
    Title:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    Price:{
        type:Number,
        required:true
    }
});


mongoose.model('products',ProductSchema);

mongoose.connect('mongodb://127.0.0.1:27017/products',{useNewUrlParser:true}).then(()=>{
    console.log('Connected to DB');
}).catch((err)=>{
   console.error(err);
});

module.exports = mongoose;