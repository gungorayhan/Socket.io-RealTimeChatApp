const Message= require("../models/messageModel")

const addMessageController=async(req,res,next)=>{
    const {from,to,message} =req.body;
    try {
        const data = await Message.create({
            message:{text:message},
            users:[from,to],
            sender:from,
        });
        if(data) return res.json({msg:"message added successfully"});
        return res.json({msg:"failed to add message to the database"})
    } catch (ex) {
        next(ex)
    }
}

const getAllMessageController=async(req,res,next)=>{
    const {from , to} =req.body;
    try {
        const messages = await Message.find({
            users:{
                $all:[from, to]
            }
        }).sort({updatedAt:1})  

        const projectMessages = messages.map((msg)=>{
            return {
                fromSelf:msg.sender.toString()===from,
                message:msg.message.text,
            }
        });

        res.json(projectMessages);
        
    } catch (ex) {
        next(ex)
    }
}

module.exports={
addMessageController,
getAllMessageController
}