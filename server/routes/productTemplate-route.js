const express = require('express');
const controller = require('../controllers/productTemplate-controller.js');

const router = express.Router();

/**
 * @swagger
 * /api/productTemplate/:
 *  get:
 *    description: Get all the list from DB
 *    produces:
 *      - application/json
 *    responses:
 *      '200':
 *        description: list fetched successfully.
 */
router.get('/', controller.getProductTemplateList);


/**
 * @swagger
 * /api/productTemplate/:
 *  post:
 *    description: Use to add User in DB
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: Add ProductTemplate
 *        description: Add ProductTemplate in DB.
 *        schema:
 *          type: object
 *          required:
 *            - name
 *          properties:
 *            templateImage:
 *              type: string
 *            name:
 *              type: string
 *            categoryID:
 *              type: number
 *            subCategoryID:
 *              type: number
 *            status:
 *              type: number
 *    responses:
 *      '200':
 *        description: ProductTemplate added successfully.
 */
router.post('/', controller.createProductTemplate);


/**
 * @swagger
 * /api/productTemplate/{id}:
 *  get:
 *    description: Get ProductTemplate by id from DB
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: id    
 *    responses:
 *      '200':
 *        description: ProductTemplate fetched successfully.
 */
router.get('/:id', controller.getProductTemplateById);


 /**
 * @swagger
 * /api/productTemplate/{id}:
 *  put:
 *    description: Used to update ProductTemplate in DB
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: id        
 *      - in: body
 *        name: Update ProductTemplate
 *        description: Update ProductTemplate in DB.
 *        schema:
 *          type: object
 *          required:
 *            - name
 *          properties:
 *            templateImage:
 *              type: string
 *            name:
 *              type: string
 *            categoryID:
 *              type: number
 *            subCategoryID:
 *              type: number
 *            status:
 *              type: number
 *    responses:
 *      '200':
 *        description: ProductTemplate updated successfully.
 */
router.put('/:id', controller.updateProductTemplate);


/**
 * @swagger
 * /api/productTemplate/{id}:
 *  delete:
 *    description: Removes ProductTemplate item from DB.
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: id
 *        description: Remove ProductTemplate Item from DB.
 *        schema:
 *          type: string
 *          required:
 *            - id
 *          properties:
 *            id:
 *              type: Number
 *    responses:
 *      '200':
 *        description: ProductTemplate removed successfully.
 */
router.delete('/:id', controller.deleteProductTemplate);


module.exports = router;