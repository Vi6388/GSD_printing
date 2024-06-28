
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productTypeSchema = new Schema({
    categoryID: {
        type: Number,
        required: true,
        min: 0
    },
    typeName: {
        type: String,
        required: true,
        maxlength: 50
    }
},
    { timestamps: true }
)

module.exports = mongoose.model("ProductType", productTypeSchema)
