const mongoose = require("mongoose");
const Category = require("../models/category.model");
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
      message: err.message,
    });
  else {
    // 500: DB connection issues...
    return res.status(500).send({
      status: false,
      message: "Oops! Internal server error." + err,
    });
  }
}

exports.getProductsByShape = async (req, res) => {
  const products = await Product.find();
  // Group the products by category ID
  const groupedProducts = products.reduce((acc, product) => {
    const { paperTypeID, paperTypeName, ...productData } = product.toObject();
    if (!acc[paperTypeID]) {
      acc[paperTypeID] = {
        paperTypeID,
        paperTypeName,
        products: [],
      };
    }
    acc[paperTypeID].products.push(productData);
    return acc;
  }, {});

  // Convert the grouped object to an array
  const productsByPaperType = Object.values(groupedProducts);

  return res.status(200).json({
    status: true,
    message: "Products by shape fetched successfully.",
    productsByPaperType: productsByPaperType,
  });
};

exports.getProductsByCategory = async (req, res) => {
  const products = await Product.find();
  // Group the products by category ID
  const groupedProducts = products.reduce((acc, product) => {
    const { categoryID, categoryName, ...productData } = product.toObject();
    if (!acc[categoryID]) {
      acc[categoryID] = {
        categoryID,
        categoryName,
        products: [],
      };
    }
    acc[categoryID].products.push(productData);
    return acc;
  }, {});

  // Convert the grouped object to an array
  const productsByCategory = Object.values(groupedProducts);

  return res.status(200).json({
    status: true,
    message: "Products by category fetched successfully.",
    productsByCategory: productsByCategory,
  });
};


exports.getProductsByShapeCategory = async (req, res) => {
  const products = await Product.find();
  // Group the products by category ID
  const groupedProducts = products.reduce((acc, product) => {
    const { categoryID, categoryName, ...productData } = product.toObject();
    if (!acc[categoryID] && categoryID == req.params.categoryID) {
      acc[categoryID] = {
        categoryID,
        categoryName,
        products: [],
      };
    }
    if(categoryID == req.params.categoryID){
      acc[categoryID].products.push(productData);
    }
    return acc;
  }, {});

  // Convert the grouped object to an array
  const productsByCategory = Object.values(groupedProducts);

  return res.status(200).json({
    status: true,
    message: "Products by category fetched successfully.",
    productsByCategory: productsByCategory,
  });
};

exports.getProduct = (req, res) => {
    let detail = {};
    console.log(req.params.productID)
    Product.find({ _id: parseInt(req.params.productID) })
            .then(async (product) => {
                if(product.length > 0) {
                    const overview = await ProductOverview.find({ productID: req.params.productID });
                    const faq = await ProductFaq.find({ productID: req.params.productID });
                    const specsAndTempate = await ProductSpecsAndTemplate.find({ productID: req.params.productID });
                    const options = await ProductOptions.find({ productID: req.params.productID });
                    const reviewAndRatings = await ProductReviewAndRatings.find({ productID: req.params.productID });
                    detail = {
                        product: product,
                        overview: overview,
                        faq: faq,
                        specsAndTemplate: specsAndTempate,
                        options: options,
                        reviewAndRatings: reviewAndRatings
                    }
                    return res.status(200).send({ status: true, products: detail });
                }
                return res.status(404).send({
                    status: false,
                    message: "Product not found with _id: " + req.params.productID
                });
            })
            .catch((err) => catchDBErr(err, res))
};