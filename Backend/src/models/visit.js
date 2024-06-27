const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
    OwnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    VisitorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    Count: { type: Number, default: 1 },
})

module.exports = mongoose.model('Visit', visitSchema)