const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({

    User1: { ref: 'User', type: mongoose.Schema.Types.ObjectId, required: true },
    User2: { ref: 'User', type: mongoose.Schema.Types.ObjectId, required: true },
    LastMessage:{type: String},
    LastMessageSeen:{type:Boolean, default:false}

},{
    timestamps:true
});

ChatSchema.statics.startConversation = async (data) => {

    try {
        const chat = new Chat(data);
        await chat.save();
        return chat;
    } catch (e) {
        console.log(e);
    }
}

ChatSchema.statics.findConversation = async(data)=>{

    try{
        const findConversation = await Chat.findOne({$and:[{$or:[{User1:data.User1},{User2:data.User1}]},
                                                          {$or:[{User1:data.User2},{User2:data.User2}]}]});
        if(findConversation===null){
            return {}
        }
        return findConversation;
    }catch(e){
        console.log(e);
    }
}

ChatSchema.statics.updateConversation = async(data)=>{
    try{
        await Chat.updateOne({_id:data._id},{$set:data});
        return true;
    }catch(e){
        console.log(e);
    }
}
const Chat = mongoose.model('Chat', ChatSchema);
module.exports = Chat;