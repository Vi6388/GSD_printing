
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    categoryImage: {
        type: String
    },
    categoryName: {
        type: String,
        required: true,
        maxlength: 50
      },
    parentCategoryID: {
        type: String,
        min: -1,
        default: -1
    },
    parentCategoryName: {
        type: String
    },
    lockStatus: {
        type: Number
    }
},
    { timestamps: true }
)

module.exports = mongoose.model("Category", categorySchema)
