
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    profileDetails: {
        profileImage: {
            type: String
        },
        firstname: {
            type: String,
            required: true,
            maxlength: 50
        },
        lastname: {
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
            required: true,
            minlength: 6
        },
        address: {
            type: String,
            maxlength: 50
        },
        state: {
            type: String,
            maxlength: 50
        },
        zipCode: {
            type: String,
            maxlength: 50
        },
        country: {
            type: String,
            maxlength: 50
        },
        language: {
            type: String,
            maxlength: 50
        },
        timezone: {
            type: String,
            maxlength: 50
        },
        currency: {
            type: Number
        }
    },
    companyDetails: {
        logo: {
            type: String
        },
        headerLogo: {
            type: String
        },
        companyName: {
            type: String
        },
        corporateName: {
            type: String
        },
        taxID: {
            type: String
        },
        phoneNumber: {
            type: String
        },
        alternativeNumber: {
            type: String
        },
        address: {
            type: String
        },
        state: {
            type: String
        },
        zipCode: {
            type: String
        },
        country: {
            type: String
        },
        currency: {
            type: Number
        }
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
},
    { timestamps: true }
)

module.exports = mongoose.model("AdminInfo", adminSchema)
