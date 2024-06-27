const router = require('express').Router();
const mongoose = require('mongoose');
const auth = require('../middlewares/auth');
const multer = require('multer');
const User = require('../models/user');
const Chat = require('../models/chat');
const Message = require('../models/message');
const { attachmentStorage } = require('../functions/gridFs');


let gfs;
mongoose.connection.once('open', () => {
    gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: 'Attachments'
    });
})

const attachment = multer({
    fileFilter(req, file, cb) {
        if (!file.originalname.toLowerCase().match(/\.(jpg||jpeg||png||jfif||pdf||doc||docx||txt)$/)) {
            return cb(new Error('File is not supported!'));
        }

        cb(undefined, true);
    },
    storage: attachmentStorage

});

router.post('/attachment', auth, attachment.any('File'), async (req, res) => {
    try {
        res.send({ files: req.files.reverse() });
    } catch (e) {
        console.log(e);
    }
})

router.get('/conversations', auth, async (req, res) => {
    try {
        let conversations = await Chat.find({ $or: [{ User1: req.user._id }, { User2: req.user._id }] }).sort({ 'updatedAt': '-1' }).limit(5);
        conversations = await Promise.all(conversations.map(async e => {
            if (e.User1.toString() !== req.user._id.toString()) {
                return { ...e.toObject(), UserData: await User.fetchUserData(e.User1), LastMessageSender: await Message.getSender(e._id) }
            } else {
                return { ...e.toObject(), UserData: await User.fetchUserData(e.User2), LastMessageSender: await Message.getSender(e._id) }
            }
        }))
        res.send({ conversations });
    } catch (e) {
        console.log(e);
    }
});

router.get('/getUnReadConversations', auth, async (req, res) => {
    try {
        let count = [];
        const conversations = await Chat.find({ $or: [{ User1: req.user._id }, { User2: req.user._id }] });
        if (conversations.length === 0) {
            return res.send({ count: count.length })
        }
        count = await Promise.all(conversations.map(async e => {
            const LastMessageSender = await Message.getSender(e._id);
            if (req.user._id.toString() !== await LastMessageSender.toString()) {
                if (e.LastMessageSeen === false) {
                    return e.LastMessageSeen;
                }
            }
        }));
        count = count.filter(e => e !== undefined).length;
        res.send({ count });

    } catch (e) {
        console.log(e);
    }
})

router.get('/attachment/:id/:filename', async (req, res) => {
    const attachment = await gfs.find({ _id: new mongoose.Types.ObjectId(req.params.id), filename: req.params.filename })
    await attachment.toArray((err, file) => {
        if (err || file.length === 0) {
            return res.send(null)
        }
        gfs.openDownloadStreamByName(file[0].filename).pipe(res)
    })
});

router.put('/update/:id', auth, async (req, res) => {
    try {
        await Chat.updateConversation({ _id: req.params.id, ...req.body })
        res.send(true);

    } catch (e) {

        console.log(e);

    }
})

router.post('/getUsers', auth, async (req, res) => {
    try {
        const users = await Message.getUsers(req.body.chatId);
        res.send(users);
    } catch (e) {
        console.log(e)
    }
})

module.exports = router;