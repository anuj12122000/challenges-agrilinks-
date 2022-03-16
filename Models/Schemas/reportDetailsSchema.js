const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const reportDetailsSchema=new Schema({

    cmdtyName:{
        type:String,
        required:true,
    },

    cmdtyID:{
            type:String,
            required:true,
            unique:false,
    },

    marketID:{
        type:String,
        required:true,
    },

    marketName:{
        type:String,
        required:true,
    },
     
    users:{
        type: [String],
       required: true,
    },

    timestamp:{
        type: Date, 
        default: Date.now ,
        required:true,
    },
    
   

   
    priceUnit:{
        type:String,
        required:true,
    },

   

    // convFctr:{
    //     type:Number,
    //     required:true,
    // },

    price:{
        type:Number,
        // required:true,
    },

   

    prices:{
        type:[Number],      
    },
});

module.exports = reportDetailsSchema;