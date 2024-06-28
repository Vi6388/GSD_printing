const express = require('express');
const productController = require('../controllers/product-controller.js');

const router = express.Router();

/**
 * @swagger
 * /api/products/getTotalProductCount:
 *  get:
 *    description: Get all the products from DB
 *    produces:
 *      - application/json
 *    responses:
 *      '200':
 *        description: Product total count fetched successfully.
 */
router.get("/totalCnt", productController.getTotalCount);

/**
 * @swagger
 * /api/products/getList:
 *  get:
 *    description: Get all the products from DB
 *    produces:
 *      - application/json
 *    responses:
 *      '200':
 *        description: products fetched successfully.
 */
router.get('/getList', productController.fetchProductList);


/**
 * @swagger
 * /api/products/getTypeList:
 *  get:
 *    description: Get all the product type list from DB
 *    produces:
 *      - application/json
 *    responses:
 *      '200':
 *        description: product type list fetched successfully.
 */
router.get("/getTypeList", productController.getProductTypeList);


/**
 * @swagger
 * /api/products/:
 *  post:
 *    description: Use to add prodcut in DB
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: Add Prodcut
 *        description: Add Prodcut in DB.
 *        schema:
 *          type: object
 *          required:
 *            - productName
 *            - categoryID
 *            - subCategoryID
 *            - paperTypeID
 *            - price
 *            - discountPrice
 *            - lockStatus
 *          properties:
 *            productImage:
 *              type: string
 *            productName:
 *              type: string
 *            categoryID:
 *              type: number
 *            subCategoryID:
 *              type: number
 *            paperTypeID:
 *              type: number
 *            price:
 *              type: number
 *            discountPrice:
 *              type: number
 *            lockStatus:
 *              type: number
 *    responses:
 *      '200':
 *        description: Product added successfully.
 */
router.post('/', productController.createProduct);

 /**
 * @swagger
 * /api/products/{productId}:
 *  put:
 *    description: Used to update product in DB
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: productId        
 *      - in: body
 *        name: Update Category
 *        description: Update category in DB.
 *        schema:
 *          type: object
 *          required:
 *            - _id
 *            - productName
 *            - categoryID
 *            - subCategoryID
 *            - paperTypeID
 *            - price
 *            - discountPrice
 *            - lockStatus
 *          properties:
 *            productImage:
 *              type: string
 *            productName:
 *              type: string
 *            categoryID:
 *              type: number
 *            subCategoryID:
 *              type: number
 *            paperTypeID:
 *              type: number
 *            price:
 *              type: number
 *            discountPrice:
 *              type: number
 *            lockStatus:
 *              type: number
 *    responses:
 *      '200':
 *        description: Product updated successfully.
 */
router.put('/:productID', productController.updateProduct);


/**
 * @swagger
 * /api/products/{productId}:
 *  delete:
 *    description: Removes product item from DB.
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: productId
 *        description: Remove Product Item from DB.
 *        schema:
 *          type: string
 *          required:
 *            - product
 *          properties:
 *            categoryID:
 *              type: number
 *            name:
 *              type: string
 *            price:
 *              type: number
 *            imageURLs:
 *              type: array
 *            launchDate:
 *              type: date
 *            rate:
 *              type: number
 *            reviews:
 *              type: number
 *            description:
 *              type: string
 *            badge:
 *              type: number
 *            paperType:
 *              type: number
 *            paperCornerType:
 *              type: number
 *    responses:
 *      '200':
 *        description: Product removed successfully.
 */
router.delete('/:productID', productController.deleteProduct);


/**
 * @swagger
 * /api/products/similar/:{categoryID}:
 *  get:
 *    description: Get similar product list by categoryID from DB
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: categoryID
 *    responses:
 *      '200':
 *        description: similar product list fetched successfully.
 */
router.get('/similar/:categoryID', productController.getSimilarProducts);


/**
 * @swagger
 * /api/products/{productID}/overview:
 *  get:
 *    description: Get product overview from DB
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: productID
 *    responses:
 *      '200':
 *        description: product overview fetched successfully.
 */
router.get("/:productID/overview", productController.getProductOverview);


/**
 * @swagger
 * /api/products/{productID}/faq:
 *  get:
 *    description: Get product faq list from DB
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: productID
 *    responses:
 *      '200':
 *        description: product faq list fetched successfully.
 */
router.get("/:productID/faq", productController.getProductFaq);


/**
 * @swagger
 * /api/products/{productID}/specsAndTemplate:
 *  get:
 *    description: Get product specsAndTemplate from DB
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: productID
 *    responses:
 *      '200':
 *        description: product specsAndTempate fetched successfully.
 */
router.get("/:productID/specsAndTemplate/", productController.getProductSpecsAndTemplate);


/**
 * @swagger
 * /api/products/{productID}/options:
 *  get:
 *    description: Get product options from DB
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: productID
 *    responses:
 *      '200':
 *        description: product options fetched successfully.
 */
router.get("/:productID/options", productController.getProductOptions);

/**
 * @swagger
 * /api/products/{productID}/reviewAndRating:
 *  get:
 *    description: Get product reviewAndRating from DB
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: productID
 *    responses:
 *      '200':
 *        description: product reviewAndRating fetched successfully.
 */
router.get("/:productID/reviewAndRating/", productController.getProductReviewAndRating);



/**
 * @swagger
 * /api/products/getProductByID/{productID}:
 *  get:
 *    description: Get product reviewAndRating from DB
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: productID
 *    responses:
 *      '200':
 *        description: product reviewAndRating fetched successfully.
 */
router.get("/getProductByID/:productID", productController.getProductByID);


module.exports = router;