const express = require('express');
const controller = require('../controllers/shop-controller');

const router = express.Router();

/**
 * @swagger
 * /api/shop/getProductsByShape/{:productID}:
 *  get:
 *    description: Get Products by paperType from DB
 *    produces:
 *      - application/json
 *    responses:
 *      '200':
 *        description: Products by paperType fetched successfully.
 */
router.get('/getProductsByShapeCategory/:categoryID', controller.getProductsByShapeCategory);

/**
 * @swagger
 * /api/shop/getProductsByShape/{:productID}:
 *  get:
 *    description: Get Products by paperType from DB
 *    produces:
 *      - application/json
 *    responses:
 *      '200':
 *        description: Products by paperType fetched successfully.
 */
router.get('/getProductsByShape', controller.getProductsByShape);



/**
 * @swagger
 * /api/shop/getProductsByCategory:
 *  get:
 *    description: Get Products by category from DB
 *    produces:
 *      - application/json  
 *    responses:
 *      '200':
 *        description: Products by category fetched successfully.
 */
router.get('/getProductsByCategory', controller.getProductsByCategory);

/**
 * @swagger
 * /api/shop/getProductsByShapeCategory:
 *  get:
 *    description: Get Products by shape category from DB
 *    produces:
 *      - application/json  
 *    responses:
 *      '200':
 *        description: Products by shape category fetched successfully.
 */
router.get('/getProductsByShapeCategory', controller.getProductsByShapeCategory);


/**
 * 
 * @swagger
 * /api/shop/{productId}:
 *  get:
 *    description: Get product by productId from DB
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: productId    
 *    responses:
 *      '200':
 *        description: products fetched successfully.
 */
router.get('/:productID', controller.getProduct);


module.exports = router;