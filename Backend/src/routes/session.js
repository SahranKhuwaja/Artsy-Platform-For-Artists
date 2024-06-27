const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');

//signin
router.post('/signIn', async (req, res) => {
    try {
        const user = await User.findOne({ Email: req.body.Email });
      
        if (!user) {
            return res.send(false)
        }
        const check = await bcrypt.compare(req.body.Password,user.Password);
        if(!check){
            return res.send(false);
        }
        req.session.userId = await user._id;
        await req.session.save();
        res.send(true);
        
    } catch (e) {
        console.log(e);
    }
});


//signout
router.post('/signOut', async (req, res) => {
    try {
        await req.session.destroy();
        res.send(true);
    } catch (e) {
        console.log(e);
    }
});

//verify email
router.get('/verifyEmail', async (req, res) => {
    try {
        const user = await User.findOne(req.query);
        console.log(user)
        res.send(user ? true : false);
    } catch (e) {
        console.log(e);
    }
})

module.exports = router;