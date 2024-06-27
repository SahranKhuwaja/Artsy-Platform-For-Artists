const router = require('express').Router();
const Post = require('../models/post');
const Like = require('../models/like');
const Comment = require('../models/comment');
const User = require('../models/user');
const auth = require('../middlewares/auth');
const ArtistBooklet = require('../models/artistBooklet');
const Image = require('../models/image');

//insert
router.post('/insert', auth, async (req, res) => {
    try {
        req.body.UserId = await req.user._id;
        let post = new Post(req.body);
        await post.save();

        let PostData = {
            ...post.toObject(),
            UserData: await User.fetchUserData(post.UserId),
            LikeCount: await Like.fetchLikeCount(post._id),
            isLiked: await Like.isLiked(post._id, req.user._id),
            CommentCount: await Comment.fetchCommentCount(post._id),
            Comments: await Comment.fetchComments(post._id, true),
            ...post.ChapterId !== undefined ? {
                ChapterData: await ArtistBooklet.fetchChapterData(e.ChapterId),
                ChapterImages: await Image.getImages(e.ChapterId)
            } : null,
        }


        res.send(PostData);
    } catch (e) {
        console.log(e);
    }
})

//View by id
router.get('/view/:id', auth, async (req, res) => {
    try {
        let posts = await Post.find({ UserId: req.params.id }).sort({ 'createdAt': '-1' }).limit(5);
        posts = await Promise.all(posts.map(async e => {
            return {
                ...e.toObject(),
                UserData: await User.fetchUserData(e.UserId),
                LikeCount: await Like.fetchLikeCount(e._id),
                isLiked: await Like.isLiked(e._id, req.user._id),
                CommentCount: await Comment.fetchCommentCount(e._id),
                Comments: await Comment.fetchComments(e._id, true),
                ...e.ChapterId !== undefined ? {
                    ChapterData: await ArtistBooklet.fetchChapterData(e.ChapterId),
                    ChapterImages: await Image.getImages(e.ChapterId)
                } : null,
            }
        }))
        res.send(posts);
    } catch (e) {
        console.log(e);
    }
})

//View Like Comment Data by Chapter id
router.get('/view/chapter/:id', auth, async (req, res) => {
    try {
        let post = await Post.findOne({ ChapterId: req.params.id, Type: 'CS' })
        post = {
            ...post.toObject(),
            LikeCount: await Like.fetchLikeCount(post._id),
            isLiked: await Like.isLiked(post._id, req.user._id),
            CommentCount: await Comment.fetchCommentCount(post._id),
            Comments: await Comment.fetchComments(post._id, false)
        }
        res.send(post);
    } catch (e) {
        console.log(e);
    }
})

//view all limit 5
router.get('/view/', auth, async (req, res) => {
    try {
        let posts = await Post.find().sort({ 'createdAt': '-1' }).limit(5);
        posts = await Promise.all(posts.map(async e => {
            return {
                ...e.toObject(),
                UserData: await User.fetchUserData(e.UserId),
                LikeCount: await Like.fetchLikeCount(e._id),
                isLiked: await Like.isLiked(e._id, req.user._id),
                CommentCount: await Comment.fetchCommentCount(e._id),
                Comments: await Comment.fetchComments(e._id, true),
                ...e.ChapterId !== undefined ? {
                    ChapterData: await ArtistBooklet.fetchChapterData(e.ChapterId),
                    ChapterImages: await Image.getImages(e.ChapterId)
                } : null,
            }
        }))
        res.send(posts);
    } catch (e) {
        console.log(e);
    }
})

module.exports = router;