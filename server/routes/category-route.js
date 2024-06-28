const express = require('express');
const categoryController = require('../controllers/category-controller.js');

const router = express.Router();

/**
 * @swagger
 * /api/categories/:
 *  get:
 *    description: Get all the categories from DB
 *    produces:
 *      - application/json
 *    responses:
 *      '200':
 *        description: categories fetched successfully.
 */
router.get('/', categoryController.getCategories);


/**
 * @swagger
 * /api/categories/:
 *  post:
 *    description: Use to add category in DB
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: Add Category
 *        description: Add Category in DB.
 *        schema:
 *          type: object
 *          required:
 *            - categoryName
 *          properties:
 *            categoryImage:
 *              type: string
 *            categoryName:
 *              type: string
 *            parentCategoryID:
 *              type: number
 *            lockStatus:
 *              type: number
 *    responses:
 *      '200':
 *        description: Category added successfully.
 */
router.post('/', categoryController.createCategory);


/**
 * @swagger
 * /api/categories/{categoryID}:
 *  get:
 *    description: Get category by categoryID from DB
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: categoryID    
 *    responses:
 *      '200':
 *        description: categories fetched successfully.
 */
router.get('/:categoryID', categoryController.getCategory);


 /**
 * @swagger
 * /api/categories/{categoryID}:
 *  put:
 *    description: Used to update category in DB
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: _id        
 *      - in: body
 *        name: Update Category
 *        description: Update category in DB.
 *        schema:
 *          type: object
 *          required:
 *            - _id
 *          properties:
 *            categoryImage:
 *              type: string
 *            categoryName:
 *              type: string
 *            parentCategoryID:
 *              type: number
 *            lockStatus:
 *              type: number
 *    responses:
 *      '200':
 *        description: Category updated successfully.
 */
router.put('/:categoryID', categoryController.updateCategory);


/**
 * @swagger
 * /api/categories/{categoryID}:
 *  delete:
 *    description: Removes category item from DB.
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: categoryID
 *        description: Remove Category Item from DB.
 *        schema:
 *          type: string
 *          required:
 *            - categoryID
 *          properties:
 *            categoryID:
 *              type: Number
 *    responses:
 *      '200':
 *        description: Category removed successfully.
 */
router.delete('/:categoryID', categoryController.deleteCategory);


/**
 * @swagger
 * /api/categories/{categoryID}/subCategories:
 *  get:
 *    description: Get subCategories by categoryID from DB
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: categoryID
 *    responses:
 *      '200':
 *        description: subCategories fetched successfully.
 */
router.get('/:categoryID/subCategories', categoryController.getSubCategories);


/**
 * @swagger
 * /api/categories/{categoryID}/products:
 *  get:
 *    description: Get products by categoryID from DB
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: categoryID
 *    responses:
 *      '200':
 *        description: products fetched successfully.
 */
router.get('/:categoryID/products', categoryController.getCategoryProducts);

module.exports = router;