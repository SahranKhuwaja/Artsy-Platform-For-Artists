const mongoose = require('mongoose');

const BookingProjectSchema = new mongoose.Schema({
    BookingRequestId: { ref: 'BookingRequest', type: mongoose.Schema.Types.ObjectId, required: true, },
    TransactionId: { ref: 'Transaction', type: mongoose.Schema.Types.ObjectId },
    isFinished: { type: Boolean, default: false },
    isPaid: { type: Boolean, default: false },
    isReviewed: { type: Boolean, default: false }

}, { timestamps: true })

BookingProjectSchema.statics.addBookingProject = async (data) => {
    const bookingProject = new BookingProject(data)
    await bookingProject.save();
    return bookingProject;
}

BookingProjectSchema.statics.fetchBookingProject = async (id) => {
    const bookingProject = await BookingProject.findOne({ BookingRequestId: id });
    return bookingProject;
}

BookingProjectSchema.statics.FinishProject = async (_id) => {
    const finish = await BookingProject.updateOne({ _id }, { $set: { isFinished: true } });
    return (finish.nModified === 1)
}


BookingProjectSchema.statics.Paid = async (_id, TransactionId ) => {
    const paid = await BookingProject.updateOne({ _id }, { $set: { TransactionId, isPaid: true } });
    return (paid.nModified === 1)
}


const BookingProject = mongoose.model('BookingProject', BookingProjectSchema);
module.exports = BookingProject