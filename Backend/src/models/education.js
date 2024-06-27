const mongoose = require('mongoose');

const EducationScehema = new mongoose.Schema({
    UserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    StartDate: { type: Date, required: true },
    EndDate: { type: Date },
    Institution: { type: String, required: true },
    Degree: { type: String, required: true },
    CurrentlyStudying: { type: Boolean, default: false }
}, { timestamps: true })

module.exports = mongoose.model('Education', EducationScehema)