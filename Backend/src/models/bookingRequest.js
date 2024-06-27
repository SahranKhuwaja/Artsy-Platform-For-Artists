const mongoose = require('mongoose');

const BookingRequestSchema = new mongoose.Schema({
    Client: { ref: 'User', type: mongoose.Schema.Types.ObjectId, required: true, },
    Artist: { ref: 'User', type: mongoose.Schema.Types.ObjectId, required: true, },
    Description: { type: String, required: true },
    Status: { type: String, default: 'Pending' },
    StatusChangeSeen: { type: Boolean, default: false },
    StartDate: { type: Date, required: true },
    EndDate: { type: Date, required: true },
    Venue: { type: String },
    PaymentAmount: { type: String, required: true },
    Currency: { type: String, required: true }
}, { timestamps: true })



BookingRequestSchema.statics.addBookingRequest = async (data) => {

    const bookingRequest = new BookingRequest(data);
    await bookingRequest.save();
    return bookingRequest;

}

BookingRequestSchema.statics.updateBookingRequest = async (data) => {

    const bookingRequest = await BookingRequest.findByIdAndUpdate(data._id, data, { new: true });
    await bookingRequest.save();
    return bookingRequest;
}

BookingRequestSchema.statics.fetchBookingRequestData = async (id) => {

    try {
        const bookingRequest = await BookingRequest.findById(id);
        return bookingRequest;

    } catch (e) {
        console.log(e)
    }
}

const BookingRequest = mongoose.model('BookingRequest', BookingRequestSchema);
module.exports = BookingRequest