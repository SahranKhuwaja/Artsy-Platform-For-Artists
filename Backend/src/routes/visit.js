const router = require('express').Router();
const auth = require('../middlewares/auth');
const Visit = require('../models/visit');
const User = require('../models/user');

//visit
router.post('/visit', auth, async (req, res) => {
    try {

        if (req.body.OwnerId == req.user._id)
            return res.send(false)

        let visit = await Visit.findOne({ OwnerId: req.body.OwnerId, VisitorId: req.user._id })

        if (visit) {
            //increment
            visit.Count++;
            await visit.save();
        } else {
            //create
            visit = new Visit({ OwnerId: req.body.OwnerId, VisitorId: req.user._id });
            await visit.save();
        }
        res.send(true);

    } catch (e) {
        console.log(e);
    }
})

//get Top visits
router.get('/topVisits', auth, async (req, res) => {
    try {

        let owners = await Visit.distinct("OwnerId")

        let visits = await Promise.all(owners.map(async (e, i) => {
            let count = await Visit.find({ OwnerId: e })
            count = await Promise.all(count.map(async e => e.Count))

            if (count.length === 1) {
                return { User: e, Count: count[0] }
            }

            count = parseInt(count.reduce((a, b) => a + b))
            return { User: e, Count: count }
        }))

        visits = await visits.sort((a, b) => b.Count - a.Count).splice(0, 5)

        visits = await Promise.all(visits.map(async e => {
            return { UserData: await User.fetchUserData(e.User) }
        }))

        res.send(visits)

    } catch (e) {
        console.log(e)
    }
})

module.exports = router;