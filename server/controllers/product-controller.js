const mongoose = require('mongoose');
const Product = require('../models/product.model');
const ProductType = require("../models/product_type.model");
const ProductOverview = require("../models/product_overview.model");
const ProductFaq = require("../models/product_faq.model");
const ProductSpecsAndTemplate = require("../models/product_specsAndTemplate.model");
const ProductOptions = require("../models/product_options.model");
const ProductReviewAndRatings = require("../models/product_reviewAndRatings.model");


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

exports.getTotalCount = (req, res, next) => {
    return Product.find().countDocuments().then(count => {
        res.status(200).json({
            status: true,
            message: "Total Count fetched",
            totalProductCount: count
        });
    }).catch((err) => catchDBErr(err, res));
}

exports.fetchProductList = (req, res, next) => {
    return Product.find()
        .then((products) => {
             if(products) {
                 return res.status(200).json({
                     status: true,
                     message: "Products fetched Successfully.",
                     products: products
                 })
             }
        })
        .catch((err) => catchDBErr(err, res))
};

exports.createProduct = (req, res) => {
    console.log("create product")
    const pProduct = req.body;
    pProduct['images'] = 'abc';
    const product = new Product(pProduct);
    console.log(req.body);
    product.save()
        .then((newProduct) => {
            if(newProduct) {
                return res.status(200).send({
                    id: product._id,
                    status: true,
                    message: "Products Created Successfully."
                })
            } else {
                return res.status(404).send({
                    status: false,
                    message: "Product create failed."
                })
            }
        })
        .catch((err) => catchDBErr(err, res))
};

exports.getProductByID = (req, res) => {
    Product.find({ _id: req.params.productID})
            .then(async (product) => {
                if(product.length > 0) {
                    return res.status(200).send({ status: true, product});
                } else {
                    return res.status(404).send({
                        status: false,
                        message: "Product not found with id: " + req.params.productID
                    })
                }
            })
            .catch((err) => catchDBErr(err, res));
}

exports.getProductTypeList = (req, res) => {
    ProductType.find({ categoryID: req.params.categoryID })
               .then((typeList) => {
                    if(typeList.length > 0) {
                        return res.status(200).send({ status: true, typeList });
                    }
                    return res.status(404).send({
                        status: false,
                        message: "Product Type list not found with categoryID " + req.params.categoryID
                    });
               })
               .catch((err) => catchDBErr(err, res))
};

exports.updateProduct = async (req, res) => {
    // Validate Request
    if (Object.keys(req.body).length === 0) {
        return res.status(400).send({
            status: false,
            message: "Request Body cannot be empty"
        });
    }
    // Find and update product with the request body
    Product.findOneAndUpdate({ _id: req.params.productID }, req.body, { new: true })
        .then((product) => {
            if (!product) {
                return res.status(404).send({
                    status: false,
                    message: "Product not found with id: " + req.params.productID
                });
            }
            return res.status(200).json({
                status: true,
                message: "Product updated Successfully.",                
            })
        })
        .catch((err) => catchDBErr(err, res))
};

exports.deleteProduct = async (req, res) => {
    Product.deleteOne({ _id: req.params.productID })
        .then((product) => {
            if (!product) {
                return res.status(404).send({
                    status: false,
                    message: "Product not found with id: " + req.params.productID
                });
            }
            return res.status(200).send({
                productID: product._id,
                status: true,
                message: "Product deleted successfully"
            });
        })
        .catch((err) => catchDBErr(err, res))
};

exports.getSimilarProducts = async(req, res) => {
    Product.find({ categoryID: req.params.categoryID })
           .then((product) => {
                if(product.length) {
                    return res.status(200).send({ status: true, product});
                } else {
                    return res.status(400).send({
                        status: false,
                        message: "No Similar Products Found based on CategoryID"
                    });
                }
           })
           .catch((err) => catchDBErr(err, res))
}

exports.getProductOverview = async(req, res) => {
    ProductOverview.find({ productID: req.params.productID })
                   .then((overview) => {
                        if(overview) {
                            return res.status(200).send({ status: true, overview});
                        } else {
                            return res.status(404).send({
                                status: false,
                                message: "No Product overview Found based on ProductID"
                            })
                        }
                   })
                   .catch((err) => catchDBErr(err, res))
}

exports.getProductFaq = async(req, res) => {
    ProductFaq.find({ productID: req.params.productID })
              .then((faq) => {
                    if(faq) {
                        return res.status(200).send({ status: true, overview});
                    } else {
                        return res.status(404).send({
                            status: false,
                            message: "No Product FAQ found based on ProductID"
                        })
                    }
              })
              .catch((err) => catchDBErr(err, res))
}

exports.getProductSpecsAndTemplate = async(req, res) => {
    ProductSpecsAndTemplate.find({ productID: req.params.productID })
                           .then((specsAndTemplate) => {
                                if(specsAndTemplate) {
                                    return res.status(200).send({ status: true, specsAndTemplate});
                                } else {
                                    return res.status(404).send({
                                        status: false,
                                        message: "No Product Specs and Template found based on ProductID"
                                    })
                                }
                           })
                           .catch((err) => catchDBErr(err, res))
}

exports.getProductOptions = async(req, res) => {
    ProductOptions.find({ productID: req.params.productID })
                  .then((options) => {
                        if(options) {
                            return res.status(200).send({ status: true, options});
                        } else {
                            return res.status(404).send({
                                status: false,
                                message: "No Product Options found based on ProductID"
                            })
                        }
                  })
                  .catch((err) => catchDBErr(err, res))
}

exports.getProductReviewAndRating = async(req, res) => {
    ProductReviewAndRatings.find({ productID: req.params.productID })
                           .then((reviewAndRatings) => {
                                if(reviewAndRatings) {
                                    return res.status(200).send({ status: true, reviewAndRatings});
                                } else {
                                    return res.status(404).send({
                                        status: false,
                                        message: "No Product Review and Ratings found based on ProductID"
                                    })
                                }
                           })
                           .catch((err) => catchDBErr(err, res))
}