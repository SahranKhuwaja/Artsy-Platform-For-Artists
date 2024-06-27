const router = require('express').Router();
const auth = require('../middlewares/auth');
const multer = require('multer');
const { projectStorage } = require('../functions/gridFs');
const mongoose = require('mongoose');
const BookingProjectFile = require('../models/bookingProjectFile');
const BookingProject = require('../models/bookingProject');

let gfs;
mongoose.connection.once('open', () => {
    gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, { bucketName: 'ProjectFiles' })
})

const Upload = multer({ storage: projectStorage })

router.post('/sendFile', auth, Upload.any('File'), async (req, res) => {
    try {
        const bookingProjectFiles = await BookingProjectFile.addBookingFiles(req.files,req.body.BookingProjectId);
        res.send({bookingProjectFiles})
    } catch (e) {
        console.log(e)
    }
})

router.get('/files/:id/:filename', async (req, res) => {
    const file = await gfs.find({ _id: new mongoose.Types.ObjectId(req.params.id), filename: req.params.filename })
    await file.toArray((err, file) => {
        if (err || file.length === 0) {
            return res.send(null)
        }
        gfs.openDownloadStreamByName(file[0].filename).pipe(res)
    })
});

router.put('/paid/:projectId',auth,async(req,res)=>{
    try{
        const update = await BookingProject.Paid(req.params.projectId,req.body.transactionId);
        res.send(update);

    }catch(e){
        cosole.log(e)
    }
})

module.exports = router;