const mongoose = require('mongoose');

const RatingReviewSchema = new mongoose.Schema({
    Artist: { ref: 'User', type: mongoose.Schema.Types.ObjectId, required: true },
    Client: { ref: 'User', type: mongoose.Schema.Types.ObjectId, required: true },
    ProjectId: { ref: 'BookingProject', type: mongoose.Schema.Types.ObjectId, required: true },
    Rating: { type: Number, required: true },
    Review: { type: String, required: true }
}, { timestamps: true })

const RatingReview = mongoose.model('RatingReview', RatingReviewSchema)
module.exports = RatingReview