const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    text:{
        type:String,
        trim:true
    },
    image:{
        type:String,

    },
    messageType:{
        type:String,
        enum:["text","image"],
        default:"text"
    },
    seen:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

Message = mongoose.model("Message",messageSchema);

module.exports = Message;