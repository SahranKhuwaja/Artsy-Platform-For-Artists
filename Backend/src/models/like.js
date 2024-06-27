const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({
    UserId: { ref: 'User', type: mongoose.Schema.Types.ObjectId, required: true },
    PostId: { ref: 'Post', type: mongoose.Schema.Types.ObjectId, required: true },
}, { timestamps: true })

LikeSchema.statics.fetchLikeCount = async (PostId) => {

    try {
        const likes = await Like.find({ PostId });
        return likes.length;

    } catch (e) {
        console.log(e)
    }
}

LikeSchema.statics.isLiked = async (PostId, UserId) => {

    try {
        const like = await Like.findOne({ PostId, UserId });
        return (like != null);

    } catch (e) {
        console.log(e)
    }
}

const Like = mongoose.model('Like', LikeSchema);
module.exports = Like