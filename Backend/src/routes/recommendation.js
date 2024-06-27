const router = require('express').Router();
const auth = require('../middlewares/auth');
const { getUsers, getVisits, getLikes, getChapterPosts, KNN, getPredictions, getPredictionsForChapters } = require('../functions/recommendation');
const User = require('../models/user');
const Post = require('../models/post');
const ArtistBooklet = require('../models/artistBooklet');
const BookletImages = require('../models/image');
const Like = require('../models/like');
const Comment = require('../models/comment');

//get user recommendation
router.get('/users', auth, async (req, res) => {
    try {
        const users = await getUsers();
        const visits = await getVisits();
        const chapterPosts = await getChapterPosts();
        const likes = await getLikes();
        const neighbours = await KNN(users, visits, chapterPosts, likes, req.user._id);
        let predictions = await getPredictions(neighbours, req.user._id);
        predictions = await Promise.all(predictions.map(async e => (
            await User.fetchUserData(e)
        )))
        let predictionsChapters = await getPredictionsForChapters(neighbours, req.user._id);
        predictionsChapters = await Promise.all(predictionsChapters.map(async e=>{
            let post = await Post.fetchPostData(e);
            return {
                ...await post.toObject(),
                UserData:await User.fetchUserData(post.UserId),
                ChapterData: await ArtistBooklet.fetchChapterData(post.ChapterId),
                ChapterImages: await BookletImages.getImages(post.ChapterId),
                LikeCount: await Like.fetchLikeCount(e._id),
                CommentCount: await Comment.fetchCommentCount(e._id) ,
                Comments: await Comment.fetchComments(e._id, 2)
            }
        }))
        res.send({ predictions, predictionsChapters })
    } catch (e) {
        console.log(e)
    }
})

module.exports = router;