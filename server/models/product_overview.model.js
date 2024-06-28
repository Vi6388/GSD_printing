
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productOverviewSchema = new Schema({
    productID: {
        type: Number,
        required: true,
        min: 0
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    image: {
        type: String
    }
},
    { timestamps: true }
)

module.exports = mongoose.model("ProductOverview", productOverviewSchema)
