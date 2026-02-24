const Message = require("../models/Message");

// send message ke liye 
exports.sendMessage = async(req, res)=>{
    try{
        const{receiver, text}= req.body;

        const imagePath = req.file ? `/uploads/images/${req.file.filename}`:null;


        const message = await Message.create({
            sender: req.user.id,
            receiver,
            text,
            image:imagePath,
            messageType:imagePath?"image":"text"
        });
        res.status(201).json(message);
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

// get chat history ke liye
exports.getMessages = async(req,res)=>{
    try{
        const messages = await Message.find({$or:[
            {sender:req.user.id, receiver:req.params.userId},
            {sender:req.params.userId, receiver:req.user.id}
        ]
    }).sort({createdAt:1});
    res.json(messages)
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

// delete message ke liye 
exports.deleteMessage = async(req,res)=>{
    try{
        await Message.findByIdAndDelete(req.params.id);
        res.json({message:"message deleted"})
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

// edit message ke liye
exports.editMessage = async(req,res)=>{
    try{
        const message = await Message.findByIdAndUpdate(
            req.params.id,
         {text: req.body.text},
    {new:true}    
    );
    res.json(message);
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

// messages seen karne par 

exports.markSeen = async(req,res)=>{
    try{
        await Message.findByIdAndUpdate(req.params.id,{
            seen:true 
        });
        res.json({message:"Seen updated"})
    }catch(error){
        res.status(500).json({message:error.message})
    }
}