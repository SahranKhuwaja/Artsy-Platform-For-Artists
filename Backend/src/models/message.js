const mongoose = require('mongoose');
const User = require('./user');

const MessageSchema = new mongoose.Schema({
    ChatId: { ref: 'Chat', type: mongoose.Schema.Types.ObjectId, required: true },
    MessageTo: { ref: 'User', type: mongoose.Schema.Types.ObjectId, required: true },
    MessageFrom: { ref: 'User', type: mongoose.Schema.Types.ObjectId, required: true },
    Message: { type: String },
    AttachmentId: { ref: 'Attachments.files', type: mongoose.Schema.Types.ObjectId },
    AttachmentType: { type: String },
    FileName: { type: String },
    Seen: { type: Boolean, default: false }
}, { timestamps: true });

MessageSchema.statics.saveMessage = async (data) => {
    try {
        let message;
        if (data.Message !== undefined) {
            message = new Message(data);
            await message.save();
        } else {
            const attachments = await Promise.all(data.Attachments.map(async e => {
                message = new Message({
                    ChatId: data.ChatId, MessageTo: data.MessageTo, MessageFrom: data.MessageFrom,
                    AttachmentId: e.id, AttachmentType: e.mimetype, FileName: e.filename
                });
                await message.save();
                return message;
            }))
            return attachments;
        }
        return message;

    } catch (e) {
        console.log(e);
    }
}

MessageSchema.statics.getMessages = async (ChatId) => {
    try {

        const messages = await Message.find({ ChatId });
        return messages;

    } catch (e) {
        console.log(e)
    }
}

MessageSchema.statics.getSender = async (ChatId) => {
    try{
        const sender = await Message.findOne({  ChatId  },{MessageFrom:'1'}).sort({'createdAt':'-1'});
        return sender.MessageFrom;

    }catch(e){
        console.log(e);
    }
}

MessageSchema.statics.getUsers = async(ChatId)=>{
    try{
        let users = await Message.findOne({  ChatId  },{MessageFrom:'1', MessageTo:'1'});
        users = {User1:await User.fetchUserData(users.MessageTo), User2:await User.fetchUserData(users.MessageFrom)}
        return users;
    }catch(e){
        console.log(e)
    }
}

const Message = mongoose.model('Message', MessageSchema);
module.exports = Message;