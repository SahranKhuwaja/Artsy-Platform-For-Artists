const router = require('express').Router();
const Like = require('../models/like');
const auth = require('../middlewares/auth');

//insert
router.post('/insert', auth, async (req, res) => {
    try {

        console.log(req.body)
        
        req.body.UserId = await req.user._id;
        let like = new Like(req.body);
        await like.save();
        res.send(like);
    } catch (e) {
        console.log(e);
    }
})

//delete
router.delete('/delete/:postId', auth, async (req, res) => {
    try {
        await Like.findOneAndDelete({ PostId: req.params.postId, UserId: req.user._id });
        res.send(true);
    } catch (e) {
        console.log(e);
    }
})

module.exports = router;