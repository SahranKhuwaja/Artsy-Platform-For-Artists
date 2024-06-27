const router = require('express').Router();
const ArtistBooklet = require('../models/artistBooklet');
const BookletImages = require('../models/image');
const User = require('../models/user');
const Post = require('../models/post');
const mongoose = require('mongoose');
const auth = require('../middlewares/auth');
const multer = require('multer');
const { bookletStorage } = require('../functions/gridFs');

let gfs;
mongoose.connection.once('open', () => {
    gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: 'BookletImages'
    });
})

const bookletImages = multer({
    fileFilter(req, file, cb) {
        if (!file.originalname.toLowerCase().match(/\.(jpg||jpeg||png||jfif)$/)) {
            return cb(new Error('File is not supported!'));
        }

        cb(undefined, true);
    },
    storage: bookletStorage

});

//insert
router.post('/insert', auth, bookletImages.any('Image'), async (req, res) => {
    try {
        let artistBooklet = new ArtistBooklet({ ...req.body, UserId: req.user._id });
        await artistBooklet.save();
        
        let post = new Post({ UserId: req.user._id, ChapterId: artistBooklet._id, Type: 'CS' });
        await post.save();
        
        artistBooklet = await BookletImages.saveBookletImages(req.files, { ...artistBooklet.toObject(), CoverImage: req.body.CoverImage });
        res.send({ artistBooklet });
    } catch (e) {
        console.log(e);
    }
});

//get Booklet of active user
router.get('/get', auth, async (req, res) => {
    try {
        let artistBooklet = await ArtistBooklet.find({ UserId: req.user._id }).sort({ 'createdAt': '-1' });
        artistBooklet = await Promise.all(artistBooklet.map(async e => {
            return { ...e.toObject(), CoverImage: await BookletImages.getCoverImage(e._id) }
        }))
        res.send({ artistBooklet })

    } catch (e) {
        console.log(e);
    }
})

//get by Id
router.get('/get/:id', auth, async (req, res) => {
    try {
        let artistBooklet = await ArtistBooklet.find({ UserId: req.params.id }).sort({ 'createdAt': '-1' });
        artistBooklet = await Promise.all(artistBooklet.map(async e => {
            return { ...e.toObject(), CoverImage: await BookletImages.getCoverImage(e._id) }
        }))
        res.send({ artistBooklet })

    } catch (e) {
        console.log(e);
    }
})

router.get('/getImages/:id', auth, async (req, res) => {
    try {

        if (req.query.mode === 'display') {
            const chapter = await ArtistBooklet.findById(req.params.id);
            const images = await BookletImages.getImages(chapter._id);
            const UserData = await User.fetchUserData(chapter.UserId)
            res.send({ ...chapter.toObject(), images, UserData })
        } else {
            const images = await BookletImages.getImages(req.params.id);
            res.send({ images })
        }
    } catch (e) {
        console.log(e);
    }
})

router.get('/image/:id/:filename', async (req, res) => {
    const image = await gfs.find({ _id: new mongoose.Types.ObjectId(req.params.id), filename: req.params.filename })
    await image.toArray((err, file) => {
        if (err || file.length === 0) {
            return res.send(null)
        }
        gfs.openDownloadStreamByName(file[0].filename).pipe(res)
    })
});

//update
router.put('/update/:id', auth, bookletImages.any('Image'), async (req, res) => {
    try {
        let artistBooklet = await ArtistBooklet.findByIdAndUpdate(req.params.id, req.body, { new: true });
        
        let post = await new Post({ UserId: req.user._id, ChapterId: artistBooklet._id, Type: 'CU' });
        await post.save();
        
        artistBooklet = await BookletImages.saveBookletImages(req.files, { ...artistBooklet.toObject(), CoverImage: -1 });
        const CoverImage = await BookletImages.getCoverImage(artistBooklet._id);
        res.send({ artistBooklet: { ...artistBooklet, CoverImage } });
    } catch (e) {
        console.log(e);
    }
})

router.post('/coverImage/update', auth, async (req, res) => {
    try {
        await BookletImages.findOneAndUpdate({ CoverImage: true }, { CoverImage: false });
        await BookletImages.updateOne({ _id: req.body.newCover }, { $set: { CoverImage: true } });
        res.send(true);

    } catch (e) {
        console.log(e);
    }
})

//viewbyid
router.get('/view/:id', async (req, res) => {
    try {
        const chapter = await ArtistBooklet.find({ Owner: req.params.id });
        res.send(chapter);
    } catch (e) {
        console.log(e);
    }
})


//delete
router.delete('/delete/:id', async (req, res) => {
    try {
        await ArtistBooklet.deleteOne({ _id: req.params.id })
        res.send(true);
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;