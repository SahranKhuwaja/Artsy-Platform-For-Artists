const router = require('express').Router();
const User = require('../models/user');
const BookingRequest = require('../models/bookingRequest');
const BookingProject = require('../models/bookingProject');
const auth = require('../middlewares/auth');
const moment = require('moment');
const BookingProjectFile = require('../models/bookingProjectFile');

router.get('/get', auth, async (req, res) => {
    try {
        let requests = [];
        if (req.user.Role === 'Artist') {
            requests = await BookingRequest.find({ Artist: req.user._id, Status: 'Pending' }).sort({ 'createdAt': '-1' }).limit(parseInt(req.query.limit));
            requests = await Promise.all(requests.map(async e => {
                return { ...e.toObject(), ClientData: await User.fetchUserData(e.Client) }
            }))
        } else {
            requests = await BookingRequest.find({ Client: req.user._id, ...(req.query.limit && { StatusChangeSeen: false }), $or: [{ Status: 'Accepted' }, { Status: 'Rejected' }] }).sort({ 'createdAt': '-1' })
                .limit(parseInt(req.query.limit));
            requests = await Promise.all(requests.map(async e => {
                return { ...e.toObject(), ArtistData: await User.fetchUserData(e.Artist) }
            }))
        }
        res.send({ requests });
    } catch (e) {
        console.log(e);
    }
})

router.get('/getRequestsCount', auth, async (req, res) => {
    try {
        let count = {};
        if (req.user.Role === 'Artist') {
            count = await BookingRequest.find({ Artist: req.user._id, Status: 'Pending' }, { Status: '1' });
        } else {
            count = await BookingRequest.find({ Client: req.user._id, StatusChangeSeen: false, $or: [{ Status: 'Accepted' }, { Status: 'Rejected' }] }, { Status: '1' });
        }
        res.send({ count: count.length });

    } catch (e) {
        console.log(e);
    }
})

//get by month
router.get('/calander/:month/:year', auth, async (req, res) => {
    let startMonth = moment([req.params.year, req.params.month]).startOf('month')
    let endMonth = moment([req.params.year, req.params.month]).endOf('month')

    let requests = await BookingRequest.find({
        ...req.user.Role === 'Artist' ? { Artist: req.user._id } : { Client: req.user._id },
        Status: 'Accepted',
        $or: [{
            $and: [{ StartDate: { $gte: startMonth } }, { StartDate: { $lte: endMonth } }]
        }, {
            $and: [{ EndDate: { $gte: startMonth } }, { EndDate: { $lte: endMonth } }]
        }]
    });

    requests = await Promise.all(requests.map(async e => {
        const bookingProject = await BookingProject.fetchBookingProject(e._id);
        return {
            ...e.toObject(),
            UserData: await User.fetchUserData(req.user.Role === 'Artist' ? e.Client : e.Artist),
            BookingProject: await bookingProject,
            BookingProjectFiles: await BookingProjectFile.fetchBookingFiles(bookingProject._id)
        }
    }))

    res.send(requests);

})

//Update status seen
router.post('/update/:id', auth, async (req, res) => {
    try {
        await Education.findByIdAndUpdate(req.params.id, { StatusChangeSeen: true });
        res.send(true);
    } catch (e) {
        console.log(e);
    }
})

module.exports = router;