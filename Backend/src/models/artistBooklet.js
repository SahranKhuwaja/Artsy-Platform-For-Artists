const mongoose = require('mongoose');

const ArtistBookletSchema = new mongoose.Schema({
    UserId: { ref: 'User', type: mongoose.Schema.Types.ObjectId, required: true },
    Title: { type: String, required: true },
    Description: { type: String, required: true },
}, { timestamps: true });

ArtistBookletSchema.statics.fetchChapterData = async (id) => {

    try {
        const chapter = await ArtistBooklet.findById(id, { Title: '1', Description: '1' });
        return chapter;

    } catch (e) {
        console.log(e)
    }
}

const ArtistBooklet = mongoose.model('ArtistBooklet', ArtistBookletSchema);
module.exports = ArtistBooklet;