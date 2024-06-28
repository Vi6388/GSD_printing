
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paperTypeSchema = new Schema({
    paperImage: {
        type: String
    },
    paperName: {
        type: String,
        required: true,
        maxlength: 50
      },
    paperType: {
        type: String,
    }
},
    { timestamps: true }
)

module.exports = mongoose.model("PaperType", paperTypeSchema)
