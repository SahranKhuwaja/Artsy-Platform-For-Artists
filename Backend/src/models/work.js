const mongoose = require('mongoose');

const WorkSchema = new mongoose.Schema({
    UserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    StartDate: { type: Date, required: true },
    EndDate: { type: Date },
    CompanyName: { type: String, required: true },
    Designation: { type: String, required: true },
    CurrentlyWorking: { type: Boolean, default: false }
}, {timestamps:true});

module.exports = mongoose.model('Work', WorkSchema);