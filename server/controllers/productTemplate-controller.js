const mongoose = require('mongoose');
const ProductTemplate = require('../models/product_template.model')

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

exports.getProductTemplateList = (req, res, next) => {
    return ProductTemplate.find()
                   .then((list) => {
                        if(list) {
                            return res.status(200).json({
                                status: true,
                                message: "ProductTemplate List fetched Successfully.",
                                list: list
                            })
                        }
                   })
                   .catch((err) => catchDBErr(err, res))
};

exports.createProductTemplate = (req, res) => {
    const productTemplate = new ProductTemplate(req.body);
    productTemplate.save()
            .then((newProductTemplate) => {
                return res.status(200).send({
                    id: newProductTemplate._id,
                    status: true,
                    message: "ProductTemplate Created Successfully."
                })
            })
            .catch((err) => catchDBErr(err, res))
};

exports.getProductTemplateById = (req, res) => {
    ProductTemplate.find({ _id: req.params.id })
            .then((productTemplate) => {
                if(productTemplate.length > 0) {
                    return res.status(200).send({ status: true, productTemplate});
                }
                return res.status(404).send({
                    status: false,
                    message: "ProductTemplate not found with id: " + req.params.id
                });
            })
            .catch((err) => catchDBErr(err, res))
};

exports.updateProductTemplate = async (req, res) => {
    // Validate Request
    if (Object.keys(req.body).length === 0) {
        return res.status(400).send({
            status: false,
            message: "Request Body cannot be empty"
        });
    }
    // Find and update ProductTemplate with the request body
    ProductTemplate.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .then((productTemplate) => {
            if (!productTemplate) {
                return res.status(200).send({
                    status: false,
                    message: "ProductTemplate not found with id: " + req.params.id
                });
            }
            return res.status(200).send({
                status: true,
                message: "ProductTemplate updated successfully."
            })
        })
        .catch((err) => catchDBErr(err, res))
};

exports.deleteProductTemplate = async (req, res) => {
    ProductTemplate.deleteOne({ _id: req.params.id })
        .then((productTemplate) => {
            if (!productTemplate) {
                return res.status(404).send({
                    status: false,
                    message: "ProductTemplate not found with id: " + req.params.id
                });
            }
            return res.status(200).send({
                id: productTemplate._id,
                status: true,
                message: "ProductTemplate deleted successfully"
            });
        })
        .catch((err) => catchDBErr(err, res))
};