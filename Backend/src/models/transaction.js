const mongoose = require('mongoose');
const validator = require('validator');

const TransactionSchema = new mongoose.Schema({
    OrderId: { type: String, required: true },
    PayerId: { type: String, required: true },
    PayerName: { type: String, required: true },
    PayerEmail: {
        type: String, required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email format violation');
            };
        }
    },
    PayerAddress: { type: String },
    GrossAmount: { type: String, required: true },
    NetAmount: { type: String, required: true },
    PaypalFees: { type: String, required: true },
    PlatformFees: { type: String, required: true },
    Currency: { type: String, required: true },
    MerChantId: { type: String, required: true },
    Status: { type: String, required: true, default: 'COMPLETED' },
    Artist: { type: mongoose.Schema.Types.ObjectId, required: true },
    Client: { type: mongoose.Schema.Types.ObjectId, required: true },
    ProjectId : { ref: 'BookingProject', type: mongoose.Schema.Types.ObjectId, required: true, }

}, { timestamps: true })

const Transaction = mongoose.model('Transaction', TransactionSchema)
module.exports = Transaction;