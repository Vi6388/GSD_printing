
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lockProductAreaSchema = new Schema({
    productID: {
        type: String
    },
    productName: {
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
        textEditing: {
            type: Boolean,
            default: false,
        },
        addImageOnProduct: {
            type: Boolean,
            default: false,
        },
        backgroundColor: {
            type: Boolean,
            default: false,
        },
        useTemplate: {
            type: Boolean,
            default: false,
        },
        addIcons: {
            type: Boolean,
            default: false,
        },
    }
},
    { timestamps: true }
)

module.exports = mongoose.model("LockProductArea", lockProductAreaSchema)
