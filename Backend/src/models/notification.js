const mongoose = require('mongoose');

const NotificationSchema = mongoose.Schema({
    NotificationTo: { ref: 'User', type: mongoose.Schema.Types.ObjectId, required: true, },
    NotificationFrom: { ref: 'User', type: mongoose.Schema.Types.ObjectId, required: true, },
    BookingRequestId: { ref: 'BookingRequest', type: mongoose.Schema.Types.ObjectId },
    ReviewId: { ref: 'Review', type: mongoose.Schema.Types.ObjectId },
    TransactionId: { ref: 'Transaction', type: mongoose.Schema.Types.ObjectId },
    PostId: { ref: 'Post', type: mongoose.Schema.Types.ObjectId },
    Type: { type: String, required: true },
    Seen: { type: Boolean, default: false }
}, { timestamps: true })

const Notification = mongoose.model('Notification', NotificationSchema);
module.exports = Notification

/*
Notification Types:
    Finished your Booking - BF
    Reviewed your Booking - BR
    Finished Payment for your booking - BP
    Liked Your Post - PL
    Commented on your Post - PC
*/