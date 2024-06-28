
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSpecsAndTemplateSchema = new Schema({
    productID: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
    },
    thicknessType: {
        type: Number,
        min: 0
    },
    cornerType: {
        type: Number,
        min: 0
    },
    fullBleedSize: {
        width: {
            type: Number,
            min: 0,
        },
        height: {
            type: Number,
            min: 0
        }
    },
    documentTrimSize: {
        width: {
            type: Number,
            min: 0,
        },
        height: {
            type: Number,
            min: 0
        }
    },
    safetyArea: {
        width: {
            type: Number,
            min: 0,
        },
        height: {
            type: Number,
            min: 0
        }
    }
},
    { timestamps: true }
)

module.exports = mongoose.model("ProductSpecsAndTemplate", productSpecsAndTemplateSchema)
