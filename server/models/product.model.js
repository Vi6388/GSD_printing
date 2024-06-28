
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
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
    images: {
        type: String,
        required: false,
        default: null
    },
    lockStatus: {
        type: Number
    }
},
    { timestamps: true }
)

module.exports = mongoose.model("Product", productSchema)
