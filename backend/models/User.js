const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true 
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: 'default.jpg' 
    },
    isOnline: {
        type: Boolean,
        default: false
    },
    lastSeen: {
        type: Date  
    }
}, { timestamps: true });

User = mongoose.model('User', userSchema);

module.exports = User;