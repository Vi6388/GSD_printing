
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
    invoiceNumber: {
        type: String
    },
    issuedDate: {
        type: Date,
        default: new Date(),
    },
    dueDate: {
        type: Date,
        default: new Date()
    },
    orderInfo: {
        address: {
            type: String
        },
        zipCode: {
            type: String
        },
        city: {
            type: String
        },
        country: {
            type: String
        },
        contactPerson: {
            firstname: {
                type: String
            },
            firstname: {
                type: String
            },
            phoneNumber1: {
                type: String
            },
            phoneNumber2: {
                type: String
            }
        }
    },
    invoiceInfo: {
        contactPerson: {
            firstname: {
                type: String
            },
            lastname: {
                type: String
            },
            phoneNumber1: {
                type: String
            },
            phoneNumber2: {
                type: String
            },
            email: {
                type: String,
                match: [
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    "Please provide a valid email",
                    ],
            }
        },
        address: {
            type: String
        },
        zipCode: {
            type: String
        },
        city: {
            type: String
        },
        country: {
            type: String
        },
    },
    paymentDetails: {
        totalAmount: {
            type: Number
        },
        bankName: {
            type: String
        },
        country: {
            type: String
        },
        iban: {
            type: String
        },
        swiftCode: {
            type: String
        },
        totalDue: {
            type: String
        }
    },
    milestones: {
        type: Array
    },
    finalPrice: {
        type: Number
    },
    taxRate: {
        type: Number
    },
    discount: {
        type: Number
    }
},
    { timestamps: true }
)

module.exports = mongoose.model("Invoice", invoiceSchema)
