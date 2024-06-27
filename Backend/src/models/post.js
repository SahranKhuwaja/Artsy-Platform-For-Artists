const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    UserId: { ref: 'User', type: mongoose.Schema.Types.ObjectId, required: true },
    Text: { type: String },
    ChapterId: { ref: 'Chapter', type: mongoose.Schema.Types.ObjectId },
    Type: { type: String, required: true },
}, { timestamps: true })

PostSchema.statics.fetchPostData = async (id) => {
    try {
        const post = await Post.findById(id);
        return post;

    } catch (e) {
        console.log(e)
    }
}

const Post = mongoose.model('Post', PostSchema);
module.exports = Post

/*
Post Types:
    Text - T
    Started Chapter - CS
    Updated a Chapter - CU
*/