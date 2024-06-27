const router = require('express').Router();
const Skill = require('../models/skill');
const auth = require('../middlewares/auth');

//insert
router.post('/insert', auth, async (req, res) => {
    try {
        req.body.UserId = await req.user._id;
        let skill = new Skill(req.body);
        await skill.save();
        res.send(true);
    } catch (e) {
        console.log(e);
    }
})

//Update
router.post('/update/:id', auth, async (req, res) => {
    try {
        await Skill.findByIdAndUpdate(req.params.id, req.body);
        res.send(true);
    } catch (e) {
        console.log(e);
    }
})

//View
router.get('/view', auth, async (req, res) => {
    try {
        const skill = await Skill.find({ UserId: req.user._id })
        res.send(skill);
    } catch (e) {
        console.log(e);
    }
})

//delete
router.delete('/delete/:id', auth, async (req, res) => {
    try {
        await Skill.findByIdAndDelete(req.params.id);
        res.send(true);
    } catch (e) {
        console.log(e);
    }
})

//View by id
router.get('/view/:id', auth, async (req, res) => {
    try {
        const skill = await Skill.find({ UserId: req.params.id })
        res.send(skill);
    } catch (e) {
        console.log(e);
    }
})

module.exports = router;