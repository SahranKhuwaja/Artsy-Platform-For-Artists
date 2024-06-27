const router = require('express').Router();
const Education = require('../models/education');
const auth = require('../middlewares/auth');

//insert
router.post('/insert', auth, async (req, res) => {
    try {
        req.body.UserId = await req.user._id;
        let education = new Education(req.body);
        await education.save();
        res.send(true);
    } catch (e) {
        console.log(e);
    }
})

//Update
router.post('/update/:id', auth, async (req, res) => {
    try {
        await Education.findByIdAndUpdate(req.params.id, req.body);
        res.send(true);
    } catch (e) {
        console.log(e);
    }
})

//View
router.get('/view', auth, async (req, res) => {
    try {
        const education = await Education.find({UserId:req.user._id})
        res.send(education);
    } catch (e) {
        console.log(e);
    }
})

//delete
router.delete('/delete/:id', auth, async (req, res) => {
    try {
        await Education.findByIdAndDelete(req.params.id);
        res.send(true);
    } catch (e) {
        console.log(e);
    }
})

//View by id
router.get('/view/:id', auth, async (req, res) => {
    try {
        const education = await Education.find({UserId:req.params.id})
        res.send(education);
    } catch (e) {
        console.log(e);
    }
})

module.exports = router;