
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productOptionsSchema = new Schema({
    productID: {
        type: Number,
        required: true,
        min: 0
    },
    productName: {
        type: String,
        required: true
    },
    optionType: {
        type: String,
        require: true,
    }
},
    { timestamps: true }
)

module.exports = mongoose.model("ProductOption", productOptionsSchema)
