const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
    UserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    Skill: { type: String, required: true },
    Description: { type: String, required: true }
})

module.exports = mongoose.model('Skill', SkillSchema);