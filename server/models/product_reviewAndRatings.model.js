
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productReviewAndRatingsSchema = new Schema({
    productID: {
        type: Number,
        required: true,
        min: 0
    },
    userID: {
        type: Number,
        required: true
    },
    userAvatar: {
        type: String,
    },
    reviewDate: {
        type: Date,
    },
    ratings: {
        type: Number,
    },
    reviewTitle: {
        type: String
    },
    reviewDescription: {
        type: String
    }
},
    { timestamps: true }
)

module.exports = mongoose.model("ProductReviewAndRatings", productReviewAndRatingsSchema)
