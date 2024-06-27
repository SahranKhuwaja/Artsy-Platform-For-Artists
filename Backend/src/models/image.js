const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    ChapterId: {type: mongoose.Schema.Types.ObjectId, required: true},
    ImageId: {type: mongoose.Schema.Types.ObjectId, required: true},
    FileName: {type: String, required: true},
    CoverImage: {type:Boolean, required:true}
}, {timestamps: true});


ImageSchema.statics.saveBookletImages = async(files,data)=>{

    let CoverImage = await Promise.all(files.map(async(e,i)=>{
        const bookletImage = new BookletImages({ChapterId:data._id,ImageId:e.id,FileName:e.filename,
                CoverImage:i.toString()===data.CoverImage?true:false});
        await bookletImage.save();
        if(bookletImage.CoverImage){
            return bookletImage;
        }
    }))
    CoverImage = CoverImage.filter(e=>e!==undefined);
    return {...data,CoverImage:CoverImage[0]}

}

ImageSchema.statics.getCoverImage = async(ChapterId)=>{
    const coverImage = await BookletImages.findOne({ChapterId, CoverImage:true},{ImageId:'1', FileName:'1'});
    return coverImage;
}

ImageSchema.statics.getImages = async(ChapterId)=>{
    const bookletImages = await BookletImages.find({ChapterId},{ImageId:'1', FileName:'1', CoverImage:'1'});
    return bookletImages;
}

const BookletImages = mongoose.model('Image', ImageSchema);
module.exports = BookletImages;