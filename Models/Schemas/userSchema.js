const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userIdSchema=new Schema({

        name:{
            type:String
        },
        UserId:{
            type:String,
            unique:true,
            required:true,
        }


});

module.exports = userIdSchema;

