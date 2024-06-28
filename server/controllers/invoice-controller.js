const mongoose = require('mongoose');
const Invoice = require('../models/invoice.model')

function catchDBErr(err, res) {
    // 400: Invalid Request Error, Duplicate Key...
    // Backup validation since validation already performed by JOI
    if (err.name === "MongoError" || err.name === "ValidationError")
        return res.status(400).send({
            status: false,
            message: err.message
        });
    else {
        // 500: DB connection issues... 
        return res.status(500).send({
            status: false,
            message: "Oops! Internal server error."
        });
    }
}

exports.getInvoiceList = (req, res, next) => {
    console.log(req.params);
    return Invoice.find()
        .then((list) => {
            if(list) {
                return res.status(200).json({
                    status: true,
                    message: "Invoice List fetched Successfully.",
                    list: list
                })
            }
        })
        .catch((err) => catchDBErr(err, res))
};

exports.create = (req, res) => {
    const invoice = new Invoice(req.body);
    invoice.save()
            .then((newItem) => {
                return res.status(200).send({
                    id: newItem._id,
                    status: true,
                    message: "Invoice Created Successfully."
                })
            })
            .catch((err) => catchDBErr(err, res))
};

exports.getById = (req, res) => {
    Invoice.find({ _id: req.params.id })
            .then((invoice) => {
                if(Invoice.length > 0) {
                    return res.status(200).send({ status: true, invoice});
                }
                return res.status(200).send({
                    status: false,
                    message: "Invoice not found with id: " + req.params.id
                });
            })
            .catch((err) => catchDBErr(err, res))
};

exports.update = async (req, res) => {
    // Validate Request
    if (Object.keys(req.body).length === 0) {
        return res.status(200).send({
            status: false,
            message: "Request Body cannot be empty"
        });
    }
    // Find and update Invoice with the request body
    Invoice.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .then((invoice) => {
            if (!invoice) {
                return res.status(200).send({
                    status: false,
                    message: "Invoice not found with id: " + req.params.id
                });
            }
            return res.send({ status: true, category});
        })
        .catch((err) => catchDBErr(err, res))
};

exports.delete = async (req, res) => {
    Invoice.deleteOne({ _id: req.params.id })
        .then((invoice) => {
            if (!invoice) {
                return res.status(200).send({
                    status: false,
                    message: "Invoice not found with id: " + req.params.id
                });
            }
            return res.status(200).send({
                id: invoice._id,
                status: true,
                message: "Invoice deleted successfully"
            });
        })
        .catch((err) => catchDBErr(err, res))
};