const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    sexPref: {
        type: [String],
        required: true
    },
    ageRange: {
        min: {
            type: Number,
            required: true
        },
        max: {
            type: Number,
            required: true
        }
    },
    location: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    filters: [mongoose.Schema.Types.ObjectId],
    hobbies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Hobby'
        }
    ],
    hobbyCustom: {
        type: [{
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            },
            image: String,
            description: String
        }],
        default: []
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    }],
    dislikes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    }],
    matches: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    }]
})

module.exports = mongoose.model('Account', schema)
