const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    FirstName: { type: String, required: true, trim: true },
    LastName: { type: String, required: true, trim: true },
    Birthday: { type: Date, required: true },
    Gender: { type: String, required: true },
    Country: { type: String, required: true },
    City: { type: String, trim: true, required: true },
    Phone: { type: String },
    Role: { type: String, required: true },
    Email: {
        type: String, required: true, unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email format violation');
            };
        }
    },
    Password: { type: String, required: true, trim: true, minlength: 7 },
    DP: { type: Buffer },
    Title: { type: String, default: '' },
    ForgetPasswordToken: { type: String },
    FPTokenExpires: { type: Date },
}, { timestamps: true });

UserSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('Password')) {
        user.Password = await bcrypt.hash(user.Password, 8);
    }
    next();
})

UserSchema.statics.fetchUserData = async (id) => {
    try {
        const user = await User.findById(id, { 'FirstName': 1, 'LastName': 1, 'DP': 1, 'Gender': 1, 'Role':1, 'Title': 1, 'Country':1, 'City':1,'Email':1 });
        return user;

    } catch (e) {
        console.log(e)
    }
}

const User = mongoose.model('User', UserSchema);
module.exports = User;