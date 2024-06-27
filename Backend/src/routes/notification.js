const router = require('express').Router();
const Notification = require('../models/notification');
const User = require('../models/user');
const auth = require('../middlewares/auth');

router.get('/get', auth, async (req, res) => {
    try {
        let notifications = await Notification.find({ NotificationTo: req.user.id }).sort({ 'createdAt': '-1' }).limit(parseInt(req.query.limit));
        notifications = await Promise.all(notifications.map(async e => {
            return { ...e.toObject(), UserData: await User.fetchUserData(e.NotificationFrom) }
        }))
        res.send(await notifications);
    } catch (e) {
        console.log(e)
    }
})

router.get('/getNotificationCount', auth, async (req, res) => {
    try {
        const notifications = await Notification.find({ NotificationTo: req.user.id, Seen: false })
        res.send({ count: notifications.length });

    } catch (e) {
        console.log(e);
    }
})

module.exports = router;