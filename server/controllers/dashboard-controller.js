const mongoose = require('mongoose');
const Product = require('../models/product.model');
const Category = require('../models/category.model');
const ProductType = require("../models/product_type.model");
const ProductOverview = require("../models/product_overview.model");
const ProductFaq = require("../models/product_faq.model");
const ProductSpecsAndTemplate = require("../models/product_specsAndTemplate.model");
const ProductOptions = require("../models/product_options.model");
const ProductReviewAndRatings = require("../models/product_reviewAndRatings.model");
const ProductTemplate = require("../models/product_template.model");
const User = require("../models/user.model");
const Transaction = require("../models/transaction.model");


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

exports.getDashboardInfo = async (req, res, next) => {
    const totalProductCount = await Product.find().countDocuments();
    const totalCategoryCount = await Category.find().countDocuments();
    const lockProductsCount = await Product.find({ lockStatus: 0 }).countDocuments();
    const newCategoryCount = await Category.find({ lockStatus: 0 }).countDocuments();
    const totalProductTemplateCount = await ProductTemplate.find().countDocuments();
    const totalActiveUsersCount = await User.find({ active: true }).countDocuments();
    const totalInActiveUsersCount = await User.find({ active: false }).countDocuments();
    const transactions = await Transaction.find({}, 'price');
    const totalTransaction = transactions.reduce((acc, transaction) => acc + transaction.price, 0);

    return res.status(200).json({
        status: true,
        totalProductCount: totalProductCount,
        totalCategoryCount: totalCategoryCount,
        lockProductsCount: lockProductsCount,
        newCategoryCount: newCategoryCount,
        totalProductTemplateCount: totalProductTemplateCount,
        totalActiveUsersCount: totalActiveUsersCount,
        totalInActiveUsersCount: totalInActiveUsersCount,
        totalTransaction: totalTransaction
    });
}