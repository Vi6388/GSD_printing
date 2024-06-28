
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    productImage: {
        type: String
    },
    productName: {
        type: String,
        required: true,
        maxlength: 50
    },
    categoryID: {
        type: String,
        required: true,
        min: 0
    },
    categoryName: {
        type: String
    },
    subCategoryID: {
        type: String,
        required: true,
        min: 0,
    },
    subCategoryName: {
        type: String
    },
    paperTypeID: {
        type: String,
        required: true,
        min: 0,
    },
    paperTypeName: {
        type: String
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    discountPrice: {
        type: Number,
        min: 0
    },
    lockStatus: {
        type: Number
    },
    username: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    transactionAmount: {
        type: Number,
        min: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    status: {
        type: Number,
        default: 0,
    }
},
    { timestamps: true }
)

module.exports = mongoose.model("Transaction", transactionSchema)
