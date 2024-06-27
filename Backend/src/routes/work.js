const router = require('express').Router();
const Work = require('../models/work');
const auth = require('../middlewares/auth');
const user = require('../models/user');

//insert
router.post('/insert', auth, async (req, res) => {
    try {
        req.body.UserId = await req.user._id;
        let work = new Work(req.body);
        await work.save();
        res.send(true);
    } catch (e) {
        console.log(e);
    }
})

//Update
router.post('/update/:id', auth, async (req, res) => {
    try {
        await Work.findByIdAndUpdate(req.params.id, req.body);
        res.send(true);
    } catch (e) {
        console.log(e);
    }
})

//View
router.get('/view', auth, async (req, res) => {
    try {
        const work = await Work.find({ UserId: req.user._id })
        res.send(work);
    } catch (e) {
        console.log(e);
    }
})

//delete
router.delete('/delete/:id', auth, async (req, res) => {
    try {
        await Work.findByIdAndDelete(req.params.id);
        res.send(true);
    } catch (e) {
        console.log(e);
    }
})

//view by id
router.get('/view/:id', auth, async (req, res) => {
    try {
        const work = await Work.find({ UserId: req.params.id })
        res.send(work);
    } catch (e) {
        console.log(e);
    }
})

module.exports = router;