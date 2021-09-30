const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    id: {
        type: Number
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    postal_code: {
        type: String
    },
    gender: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Users', UserSchema);