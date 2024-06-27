const router = require('express').Router();
const RatingReview = require('../models/ratingReview');
const BookingProject = require('../models/bookingProject');
const User = require('../models/user');
const auth = require('../middlewares/auth');

//insert
router.post('/insert', auth, async (req, res) => {
    try {
        let review = new RatingReview({ ...req.body, Client: req.user._id });
        await review.save();
        let project = await BookingProject.findByIdAndUpdate(req.body.ProjectId, { isReviewed: true });
        await project.save();
        res.send({ review });
    } catch (e) {
        console.log(e);
    }
})

//View
router.get('/view/:ProjId', auth, async (req, res) => {
    try {
        const review = await RatingReview.findOne({ ProjectId: req.params.ProjId })
        res.send(review);
    } catch (e) {
        console.log(e);
    }
})

//View by userId
router.get('/view/user/:id', auth, async (req, res) => {
    try {

        let user = await User.fetchUserData(req.params.id)

        let reviews = await RatingReview.find({
            ...user.Role === 'Artist' ? { Artist: user._id } : { Client: user._id }
        }).sort({ createdAt: 'desc' }).limit(6)

        reviews = await Promise.all(reviews.map(async e => {
            return {
                ...e.toObject(),
                UserData: await User.fetchUserData(user.Role === 'Artist' ? e.Client : e.Artist),
            }
        }))

        res.send(reviews);
    } catch (e) {
        console.log(e);
    }
})

//
router.get('/rating/:id', auth, async (req, res) => {
    try {
        let ratings = await RatingReview.find({ Artist: req.params.id }, { Rating: '1' });
        let length = ratings.length;
        ratings = await (await Promise.all(ratings.map(async e => e.Rating)));
        if (ratings.length === 0) {
            return res.send({ average: 0 })
        }
        let average = parseInt((ratings.reduce((a, b) => a + b)) / length)
        res.send({ average });
    } catch (e) {
        console.log(e)
    }
})

module.exports = router;