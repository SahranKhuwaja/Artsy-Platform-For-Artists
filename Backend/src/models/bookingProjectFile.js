const mongoose = require('mongoose');

const bookingProjectFileSchema = new mongoose.Schema({
    BookingProjectId: { ref: 'BookingProject', type: mongoose.Schema.Types.ObjectId, required: true },
    ProjectFileId: { ref: 'ProjectFile', type: mongoose.Schema.Types.ObjectId, required: true },
    FileName: { type: String, required: true },
})

bookingProjectFileSchema.statics.addBookingFiles = async (files, BookingProjectId) => {

    let bookingProjectFile = undefined;
    const bookingProjectFiles = await Promise.all(files.map(async e => {
        bookingProjectFile = new BookingProjectFile({
            BookingProjectId, ProjectFileId: e.id, FileName: e.filename
        });
        await bookingProjectFile.save();
        return bookingProjectFile;
    }))
    return bookingProjectFiles;
}

bookingProjectFileSchema.statics.fetchBookingFiles = async (BookingProjectId) => {
    const BookingProjectFiles = await BookingProjectFile.find({BookingProjectId});
    return BookingProjectFiles;
}

const BookingProjectFile = new mongoose.model('BookingProjectFile', bookingProjectFileSchema);

module.exports = BookingProjectFile;

