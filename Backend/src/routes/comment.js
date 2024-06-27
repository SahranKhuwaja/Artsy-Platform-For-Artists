const router = require('express').Router();
const Comment = require('../models/comment');
const User = require('../models/user');
const auth = require('../middlewares/auth');

//insert
router.post('/insert', auth, async (req, res) => {
    try {
        req.body.UserId = await req.user._id;
        let comment = new Comment(req.body);
        await comment.save();
        comment = { ...comment.toObject(), UserData: await User.fetchUserData(comment.UserId) }

        res.send(comment);
    } catch (e) {
        console.log(e);
    }
})

module.exports = router;