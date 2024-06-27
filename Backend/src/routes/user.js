const router = require('express').Router();
const User = require('../models/user');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const auth = require('../middlewares/auth');
const multer = require('multer');
const sharp = require('sharp');
const bcrypt = require('bcryptjs');

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {

        if (!file.originalname.toLowerCase().match(/\.(jpg||jpeg||png||jfif)$/)) {
            return cb(new Error('Please upload image!'));
        }
        cb(undefined, true);
    }
});

//insert
router.post('/insert', async (req, res) => {
    try {
        let user = new User(req.body);
        await user.save();
        req.session.userId = user._id;
        res.send(true)
    } catch (e) {
        console.log(e);
    }
})

//Sends email
router.post('/forgetpassword/request', async (req, res) => {
    try {
        const user = await User.findOne({ Email: req.body.Email });
        if (!user) {
            return res.send(false);
        }
        const token = await crypto.randomBytes(40);
        user.ForgetPasswordToken = await token.toString('hex');
        user.FPTokenExpires = await Date.now() + 60 * 60 * 1000;
        user.save();
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'artsylabteam@gmail.com',
                pass: 'ArtsyTeam000'
            }
        });

        var mailOptions = {
            to: user.Email,
            from: `ARTSY < artsylabteam@gmail.com >`,
            subject: 'ARTSY Password Reset Token',
            text: 'You have requested for password reset. \n\n' +
                'Please click on the link to reset your password. \n\n' +
                `http://localhost:3000/ResetPassword/${token.toString('hex')}`
        };

        await transporter.sendMail(mailOptions, (err, success) => {
            if (err) {
                console.log(err);
                return res.send({ error: err })
            }
            res.send(true);
        });

    } catch (e) {
        console.log(e);
    }
})

//verrifies Email link
router.get('/resetpassword/:token', async (req, res) => {
    try {
        const user = await User.findOne({ ForgetPasswordToken: req.params.token, FPTokenExpires: { $gt: Date.now() } });
        if (!user) {
            return res.send(false);
        }
        res.send(true)
    } catch (e) {
        console.log(e)
    }

})

//reset Password through forget link
router.post('/resetpassword/:token', async (req, res) => {
    try {
        const user = await User.findOne({ ForgetPasswordToken: req.params.token, FPTokenExpires: { $gt: Date.now() } });
        if (!user) {
            return res.send(false);
        }
        user.Password = await req.body.Password;
        await user.save();
        res.send(true);
    } catch (e) {
        console.log(e)
    }

})

//resetPassword
router.post('/resetpassword', async (req, res) => {
    try {
        const user = await User.findById(req.session.userId)
        user.Password = await req.body.Password;
        await user.save();
        res.send(true);
    } catch (e) {
        console.log(e)
    }

})

//edit by id
router.post('/edit', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.session.userId, req.body)
        res.send(true);
    } catch (e) {
        console.log(e)
    }
})

//redirect to profile
router.get('/profile/about', auth, async (req, res) => {
    try {
        res.send(req.user);
    } catch (e) {
        console.log(e);
    }
})

//compare Passwords
router.post('/verifyPassword', async (req, res) => {
    try {
        const user = await User.findById(req.session.userId)
        const check = await bcrypt.compare(req.body.Password, user.Password);
        if (!check) {
            return res.send(false);
        }
        return res.send(true);
    } catch (e) {
        console.log(e);
    }
})

//upload dp
router.post('/upload', auth, upload.single('Dp'), async (req, res) => {
    try {
        const buffer = await sharp(req.file.buffer).resize(300, 300).png().toBuffer();
        const user = await User.findById(req.user._id);
        user.DP = await buffer;
        await user.save();
        res.send({Dp:buffer});
    } catch (e) {
        console.log(e)
        res.send(false);
    }
})

//get User by id
router.get('/:id', auth, async (req,res) => {
    try {
        let user = await User.findById(req.params.id)
        user.Password = undefined
        user.ForgetPasswordToken = undefined
        user.FPTokenExpires = undefined
        res.send(user);
    } catch (e) {
        console.log(e)
    }
})
module.exports = router;