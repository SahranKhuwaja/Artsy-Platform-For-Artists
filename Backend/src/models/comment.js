const mongoose = require('mongoose');
const User = require('./user')

const CommentSchema = new mongoose.Schema({
    UserId: { ref: 'User', type: mongoose.Schema.Types.ObjectId, required: true },
    PostId: { ref: 'Post', type: mongoose.Schema.Types.ObjectId, required: true },
    Text: { type: String, required: true },
}, { timestamps: true })

CommentSchema.statics.fetchCommentCount = async (PostId) => {

    try {
        const comments = await Comment.find({ PostId });
        return comments.length;

    } catch (e) {
        console.log(e)
    }
}

CommentSchema.statics.fetchComments = async (PostId, limit) => {

    try {
        let comments = limit ? await Comment.find({ PostId }).limit(2) : await Comment.find({ PostId })
        comments = await Promise.all(comments.map(async e => {
            return { ...e.toObject(), UserData: await User.fetchUserData(e.UserId) }
        }))
        return comments;

    } catch (e) {
        console.log(e)
    }
}

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment