
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productTemplateSchema = new Schema({
    templateImage: {
        type: String
    },
    name: {
        type: String
    },
    categoryID: {
        type: String
    },
    categoryName: {
        type: String
    },
    subCategoryID: {
        type: String
    },
    subCategoryName: {
        type: String
    },
    paperTypeID: {
        type: String
    },
    paperTypeName: {
        type: String
    },
    status: {
        type: Number
    },
    objects: {
        type: String
    },
},
    { timestamps: true }
)

module.exports = mongoose.model("ProductTemplate", productTemplateSchema)
