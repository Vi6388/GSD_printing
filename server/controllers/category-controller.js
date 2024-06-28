const mongoose = require('mongoose');
const Category = require('../models/category.model')
const Product = require('../models/product.model')

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
            message: "Oops! Internal server error." + err
        });
    }
}

exports.getCategories = (req, res, next) => {
    return Category.find()
                   .then((categories) => {
                        if(categories) {
                            return res.status(200).json({
                                status: true,
                                message: "Categories fetched Successfully.",
                                categories: categories
                            })
                        }
                   })
                   .catch((err) => catchDBErr(err, res))
};

exports.createCategory = (req, res) => {
    const category = new Category(req.body);
    category.save()
        .then((newCategory) => {
            return res.status(200).send({
                category: newCategory,
                status: true,
                message: "Category Created Successfully."
            })
        })
        .catch((err) => catchDBErr(err, res))
};

exports.getCategory = (req, res) => {
    Category.find({ _id: req.params.categoryID })
            .then((category) => {
                if(category.length > 0) {
                    return res.status(200).json({status: true, category});
                }
                return res.status(404).send({
                    status: false,
                    message: "Category not found with categoryID: " + req.params.categoryID
                });
            })
            .catch((err) => catchDBErr(err, res))
};

exports.updateCategory = async (req, res) => {
    // Validate Request
    if (Object.keys(req.body).length === 0) {
        return res.status(400).send({
            status: false,
            message: "Request Body cannot be empty"
        });
    }
    // Find and update category with the request body
    Category.findOneAndUpdate({ _id: req.body.id }, req.body, { new: true })
        .then((category) => {
            if (!category) {
                return res.status(200).send({
                    status: false,
                    message: "Category not found with categoryID: " + req.body.id
                });
            }
            return res.json({
                status: true,
                category: category,
                message: "Update category successfully."
            });
        })
        .catch((err) => catchDBErr(err, res))
};

exports.deleteCategory = async (req, res) => {
    console.log(req.params)
    Category.deleteOne({ _id: req.params.categoryID })
        .then((category) => {
            if (!category) {
                return res.status(200).send({
                    status: false,
                    message: "Category not found with categoryID: " + req.params.categoryID
                });
            }
            return res.status(200).send({
                id: category._id,
                status: true,
                message: "Category deleted successfully !"
            });
        })
        .catch((err) => catchDBErr(err, res))
};

exports.getSubCategories = async (req, res) => {
    const categoryID = req.params.categoryID === "0" ? null : req.params.categoryID;
    Category.find({ parentCategoryID: categoryID })
        .then((category) => {
            if (category.length) {
                return res.status(200).json({
                    status: true,
                    categories: category
                });
            }
            else {
                return res.status(200).json({
                    status: true,
                    categories: [],
                    message: "No Sub-Categories for categoryID: " + req.params.categoryID
                });
            }
        })
        .catch((err) => catchDBErr(err, res))
};

exports.getCategoryProducts = async (req, res) => {
    
    Category.find({ _id: req.params.categoryID })
        .then((category) => {
            if (category.length) {
                // find products with categoryID == this.categoryID
                Product.find({ categoryID: category[0]._id })
                    .then((product) => {
                        if (product.length) {
                            return res.status(200).send({ status: true, product});
                        }
                        else {
                            return res.status(404).send({
                                status: false,
                                message: "No Products for categoryID: " + req.params.categoryID
                            });
                        }
                    })
                    .catch((err) => catchDBErr(err, res))
            }
            else {
                return res.status(200).send({
                    status: false,
                    message: "Category not found with categoryID: " + req.params.categoryID
                });
            }
        })
        .catch((err) => catchDBErr(err, res))
}