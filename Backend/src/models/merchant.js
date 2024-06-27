const mongoose = require('mongoose');

const MerchantSchema = new mongoose.Schema({
    UserId: { ref: 'User', type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
    AccountStatus: { type: String, required: true },
    MerchantId: { type: String, required: true },
    MerchantIdInPaypal: { type: String, required: true },
}, { timeStamps: true })


const Merchant = mongoose.model('Merchant', MerchantSchema);
module.exports = Merchant;
