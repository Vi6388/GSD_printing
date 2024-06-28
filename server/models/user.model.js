
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    profileImage: {
        type: String
    },
    firstName: {
        type: String,
        required: true,
        maxlength: 50
    },
    lastName: {
        type: String,
        required: true,
        maxlength: 50
    },
    phoneNumber: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        required: [true, "Please provide email address"],
        unique: true,
        match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
        ],
    },
    password: {
        type: String,
        minlength: 6
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    active: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true }
)

module.exports = mongoose.model("User", userSchema)
