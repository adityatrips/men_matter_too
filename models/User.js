const { Schema, model } = require('mongoose');
const profileBase64 = require('../config/defaults');
const bcrypt = require('bcrypt');
const { v4 } = require('uuid');

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: [true, 'Username is already in use'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email is already in use'],
        trim: true,
    },
    bio: {
        type: String,
        default: '',
    },
    password: {
        type: String,
    },
    authToken: {
        type: String,
        default: v4(),
    },
    followers: {
        type: [Schema.Types.ObjectId],
        ref: 'User',
        default: [],
    },
    following: {
        type: [Schema.Types.ObjectId],
        ref: 'User',
        default: [],
    },
    posts: {
        type: [Schema.Types.ObjectId],
        ref: 'Post',
        default: [],
    },
    profilePicture: {
        type: String,
        default: profileBase64,
    },
    role: {
        type: String,
        enum: ['user', 'founder', 'admin'],
        default: 'user',
    },

}, { timestamps: true });

userSchema.pre('save', function (next) {
    try {
        const user = this;
        if (!user.isModified('password')) return next();
        bcrypt.genSalt(10, function (err, salt) {
            if (err) return next(err);
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);
                user.password = hash;
                next();
            });
        });
    } catch (error) {
        next(error);
    }
})

userSchema.methods.comparePassword = function (password, cb) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    })
}

module.exports = model('User', userSchema);